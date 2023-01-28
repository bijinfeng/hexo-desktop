/**
 * code from https://github.com/streetwriters/notesnook/blob/master/packages/editor/src/extensions/search-replace/search-replace.ts
 */

import { Editor, Extension } from '@tiptap/core';
import {
  EditorState,
  Plugin,
  PluginKey,
  TextSelection,
  Transaction,
} from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

type DispatchFn = (tr: Transaction) => void;
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    searchreplace: {
      startSearch: () => ReturnType;
      endSearch: () => ReturnType;
      search: (term: string, options?: SearchSettings) => ReturnType;
      moveToNextResult: () => ReturnType;
      moveToPreviousResult: () => ReturnType;
      replace: (term: string) => ReturnType;
      replaceAll: (term: string) => ReturnType;
    };
  }
}

interface Result {
  from: number;
  to: number;
}

interface SearchOptions {
  searchResultClass: string;
}

interface SearchSettings {
  matchCase: boolean;
  enableRegex: boolean;
  matchWholeWord: boolean;
}

export type SearchStorage = SearchSettings & {
  searchTerm: string;
  selectedIndex: number;
  isSearching: boolean;
  selectedText?: string;
  results?: Result[];
};

interface TextNodesWithPosition {
  text: string;
  pos: number;
}

const updateView = (state: EditorState, dispatch: DispatchFn) => {
  if (!state.tr) return;

  state.tr.setMeta('forceUpdate', true);
  dispatch(state.tr);
};

const regex = (s: string, settings: SearchSettings): RegExp => {
  const { enableRegex, matchCase, matchWholeWord } = settings;
  const boundary = matchWholeWord ? '\\b' : '';
  console.log(boundary);
  return RegExp(
    boundary + (enableRegex ? s : s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')) + boundary,
    matchCase ? 'gu' : 'gui',
  );
};

function searchDocument(
  tr: Transaction,
  searchResultClass: string,
  searchTerm?: RegExp,
  selectedIndex?: number,
): { decorationSet: DecorationSet; results: Result[]; startIndex: number } {
  if (!searchTerm)
    return {
      decorationSet: DecorationSet.empty,
      results: [],
      startIndex: selectedIndex || 0,
    };

  const doc = tr.doc;
  const decorations: Decoration[] = [];
  const results: Result[] = [];

  let index = 0;
  let textNodesWithPosition: TextNodesWithPosition[] = [];

  doc?.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        textNodesWithPosition[index] = {
          text: textNodesWithPosition[index].text + node.text,
          pos: textNodesWithPosition[index].pos,
        };
      } else {
        textNodesWithPosition[index] = {
          text: node.text || '',
          pos,
        };
      }
    } else {
      index += 1;
    }
  });
  textNodesWithPosition = textNodesWithPosition.filter(Boolean);

  for (const { text, pos } of textNodesWithPosition) {
    const matches = text.matchAll(searchTerm);

    for (const m of matches) {
      if (m[0] === '') break;

      if (m.index !== undefined) {
        results.push({
          from: pos + m.index,
          to: pos + m.index + m[0].length,
        });
      }
    }
  }

  const { from: selectedFrom, to: selectedTo } = tr.selection;
  for (let i = 0; i < results.length; i++) {
    const { from, to } = results[i];
    if (
      // if a result is already selected, persist it
      (selectedFrom === from && to === selectedTo) ||
      // otherwise select the first matching result after the selection
      from >= selectedFrom
    ) {
      selectedIndex = i;
      break;
    }
  }

  for (let i = 0; i < results.length; i++) {
    const { from, to } = results[i];
    const resultClass =
      i === selectedIndex ? `${searchResultClass} selected` : searchResultClass;
    decorations.push(Decoration.inline(from, to, { class: resultClass }));
  }

  return {
    startIndex: selectedIndex || 0,
    decorationSet: DecorationSet.create(doc, decorations),
    results,
  };
}

const replaceAll = (replaceTerm: string, results: Result[], tr: Transaction) => {
  if (!results.length) return;

  const map = tr.mapping;
  for (let i = 0; i < results.length; i += 1) {
    const { from, to } = results[i];

    tr.insertText(replaceTerm, from, to);

    if (i + 1 < results.length) {
      const { from, to } = results[i + 1];
      results[i + 1] = {
        from: map.map(from),
        to: map.map(to),
      };
    }
  }
  return tr;
};

export const SearchReplace = Extension.create<SearchOptions, SearchStorage>({
  name: 'searchreplace',

  addOptions() {
    return {
      searchResultClass: 'search-result',
    };
  },

  addCommands() {
    return {
      startSearch:
        () =>
        ({ state }) => {
          this.storage.isSearching = true;
          if (!state.selection.empty) {
            this.storage.selectedText = state.doc.textBetween(
              state.selection.$from.pos,
              state.selection.$to.pos,
            );
          }
          return true;
        },
      endSearch:
        () =>
        ({ state, dispatch, editor }) => {
          this.storage.isSearching = false;
          this.storage.selectedText = undefined;
          this.storage.searchTerm = '';
          editor.commands.focus();
          if (dispatch) updateView(state, dispatch);
          return true;
        },
      search:
        (term, options?: SearchSettings) =>
        ({ state, dispatch }) => {
          this.storage.selectedIndex = 0;
          this.storage.searchTerm = term;
          this.storage.enableRegex = options?.enableRegex || false;
          this.storage.matchCase = options?.matchCase || false;
          this.storage.matchWholeWord = options?.matchWholeWord || false;
          this.storage.results = [];

          if (dispatch) updateView(state, dispatch);
          return true;
        },
      moveToNextResult:
        () =>
        ({ state, dispatch, commands }) => {
          const { selectedIndex, results } = this.storage;
          if (!results || results.length <= 0) return false;

          let nextIndex = selectedIndex + 1;
          if (isNaN(nextIndex) || nextIndex >= results.length) nextIndex = 0;

          const { from, to } = results[nextIndex];
          commands.setTextSelection({ from, to });
          scrollIntoView(this.editor, from);

          this.storage.selectedIndex = nextIndex;
          if (dispatch) updateView(state, dispatch);
          return true;
        },
      moveToPreviousResult:
        () =>
        ({ state, dispatch, commands }) => {
          const { selectedIndex, results } = this.storage;
          if (!results || results.length <= 0) return false;

          let prevIndex = selectedIndex - 1;
          if (isNaN(prevIndex) || prevIndex < 0) prevIndex = results.length - 1;

          const { from, to } = results[prevIndex];
          commands.setTextSelection({ from, to });
          scrollIntoView(this.editor, from);

          this.storage.selectedIndex = prevIndex;
          if (dispatch) updateView(state, dispatch);

          return true;
        },
      replace:
        (term) =>
        ({ commands, tr, dispatch }) => {
          const { selectedIndex, results } = this.storage;

          if (!dispatch || !results || results.length <= 0) return false;

          const index = selectedIndex === undefined ? 0 : selectedIndex;
          const { from, to } = results[index];

          tr.insertText(term, from, to);

          if (index + 1 < results.length) {
            const { from, to } = results[index + 1];
            const nextResult = (results[index + 1] = {
              from: tr.mapping.map(from),
              to: tr.mapping.map(to),
            });

            commands.focus();
            tr.setSelection(
              new TextSelection(
                tr.doc.resolve(nextResult.from),
                tr.doc.resolve(nextResult.to),
              ),
            );
          }
          dispatch(tr);
          results.splice(index, 1);
          return true;
        },
      replaceAll:
        (term) =>
        ({ tr, dispatch }) => {
          if (!dispatch) return false;
          const { results } = this.storage;
          if (!dispatch || !results || results.length <= 0) return false;

          dispatch(replaceAll(term, results, tr));
          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-f': ({ editor }) => editor.commands.startSearch(),
      Escape: ({ editor }) => editor.commands.endSearch(),
    };
  },

  addProseMirrorPlugins() {
    const key = new PluginKey('searchreplace');

    return [
      new Plugin({
        key,
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply: (tr, value) => {
            const { docChanged } = tr;
            const forceUpdate = tr.getMeta('forceUpdate');
            const {
              searchTerm,
              enableRegex,
              matchCase,
              matchWholeWord,
              selectedIndex,
              isSearching,
            } = this.storage;
            if (docChanged || forceUpdate) {
              const { searchResultClass } = this.options;

              const searchRegex = searchTerm
                ? regex(searchTerm, { enableRegex, matchCase, matchWholeWord })
                : undefined;
              const result = searchDocument(
                tr,
                searchResultClass,
                searchRegex,
                selectedIndex,
              );
              const { decorationSet, results, startIndex } = result;
              this.storage.results = results;
              this.storage.selectedIndex = startIndex;

              return decorationSet;
            }

            return isSearching ? value : DecorationSet.empty;
          },
        },
        props: {
          decorations(state) {
            return key.getState(state);
          },
        },
      }),
    ];
  },
});

function scrollIntoView(editor: Editor, from: number) {
  setTimeout(() => {
    const domNode = document.querySelector('.search-result.selected');
    if (!(domNode instanceof HTMLElement)) return;

    domNode.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
}
