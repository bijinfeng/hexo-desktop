import 'remirror/styles/all.css';

import { FindExtension } from '@remirror/extension-find';
import { EditorComponent, Remirror, RemirrorProps, useRemirror } from '@remirror/react';
import cls from 'classnames';
import { debounce } from 'lodash-es';
import React, { useCallback, useRef } from 'react';
import jsx from 'refractor/lang/jsx.js';
import typescript from 'refractor/lang/typescript.js';
import { ExtensionPriority } from 'remirror';
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CalloutExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TaskListExtension,
  TrailingNodeExtension,
  UnderlineExtension,
} from 'remirror/extensions';

import FindReplace from './components/find-replace';
import Menu from './components/menu';
import styles from './style.module.less';

const extensions = () => [
  new FindExtension(),
  new LinkExtension({ autoLink: true }),
  new BoldExtension(),
  new CalloutExtension(),
  new StrikeExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new LinkExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
  new CodeExtension(),
  new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new TaskListExtension(),
  new UnderlineExtension(),
  new MarkdownExtension({ copyAsMarkdown: false }),
  /**
   * `HardBreakExtension` allows us to create a newline inside paragraphs.
   * e.g. in a list item
   */
  new HardBreakExtension(),
];

export interface MarkdownEditorProps {
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const { value, editable = true, onChange } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const { manager, state } = useRemirror({
    extensions,
    content: value,
    stringHandler: 'markdown',
  });

  const handleChange = useCallback(
    debounce<Required<RemirrorProps>['onChange']>((parameter) => {
      const markdownText = parameter.helpers.getMarkdown(parameter.state);
      onChange?.(markdownText);
    }, 300),
    [],
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Remirror
        editable={editable}
        manager={manager}
        initialContent={state}
        onChange={handleChange}
      >
        {editable && <Menu />}
        <div
          ref={contentRef}
          className={cls(
            'flex-1 h-full relative overflow-auto remirror-theme border-t border-t-border',
            styles.wrapper,
          )}
        >
          <EditorComponent />
          <FindReplace nodeRef={contentRef} />
        </div>
      </Remirror>
    </div>
  );
};

export default MarkdownEditor;
