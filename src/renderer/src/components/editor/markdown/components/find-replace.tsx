import { Input } from '@arco-design/web-react';
import type { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { IconClose, IconLeft, IconRight } from '@arco-design/web-react/icon';
import { FindExtension } from '@remirror/extension-find';
import { useCommands, useHelpers } from '@remirror/react';
import { useKeyPress } from 'ahooks';
import cls from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

interface FindReplaceState {
  query: string;
  replacement: string;
  activeIndex: number | null;
  total: number;
  caseSensitive: boolean;
}

function initialState(): FindReplaceState {
  return {
    query: '',
    replacement: '',
    activeIndex: null,
    total: 0,
    caseSensitive: false,
  };
}

function useFindReplace() {
  const helpers = useHelpers<FindExtension>();
  const commands = useCommands<FindExtension>();
  const [state, setState] = useState<FindReplaceState>(initialState);

  const find = useCallback(
    (indexDiff = 0): void => {
      setState((state): FindReplaceState => {
        const { query, caseSensitive, activeIndex } = state;
        const result = helpers.findRanges({
          query,
          caseSensitive,
          activeIndex: activeIndex == null ? 0 : activeIndex + indexDiff,
        });
        return {
          ...state,
          total: result.ranges.length,
          activeIndex: result.activeIndex ?? 0,
        };
      });
    },
    [helpers],
  );

  const findNext = useCallback(() => find(+1), [find]);
  const findPrev = useCallback(() => find(-1), [find]);

  const stopFind = useCallback(() => {
    setState(initialState());
    commands.stopFind();
  }, [commands]);

  const replace = useCallback((): void => {
    const { query, replacement, caseSensitive } = state;
    commands.findAndReplace({ query, replacement, caseSensitive });
    find();
  }, [commands, state, find]);

  const replaceAll = useCallback((): void => {
    const { query, replacement, caseSensitive } = state;
    commands.findAndReplaceAll({ query, replacement, caseSensitive });
    find();
  }, [commands, state, find]);

  const toggleCaseSensitive = useCallback(() => {
    setState((state) => {
      return { ...state, caseSensitive: !state.caseSensitive };
    });
  }, []);
  const setQuery = useCallback((query: string) => {
    setState((state) => ({ ...state, query }));
  }, []);
  const setReplacement = useCallback((replacement: string) => {
    setState((state) => ({ ...state, replacement }));
  }, []);

  useEffect(() => {
    find();
  }, [find, state.query, state.caseSensitive]);

  return {
    ...state,
    findNext,
    findPrev,
    stopFind,
    replace,
    replaceAll,

    toggleCaseSensitive,
    setQuery,
    setReplacement,
  };
}

export interface FindReplaceProps {
  nodeRef: React.RefObject<HTMLElement>;
}

const FindReplace: React.FC<FindReplaceProps> = ({ nodeRef }) => {
  const inputRef = useRef<RefInputType>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { query, total, activeIndex, setQuery, stopFind, findNext, findPrev } =
    useFindReplace();

  const handleOpen = useCallback(() => {
    setShowSearch(true);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    AppEventManager.on(EventType.VISIBLE_FILE_SEARCH, handleOpen);
    return () => {
      AppEventManager.removeListener(EventType.VISIBLE_FILE_SEARCH, handleOpen);
    };
  }, [handleOpen]);

  useKeyPress(['meta.f'], handleOpen, {
    exactMatch: true,
    target: nodeRef,
  });

  const handClose = () => {
    stopFind();
    setShowSearch(false);
  };

  return (
    <div
      className={cls('absolute !w-2/5 right-2.5 top-2.5', 'search-box', {
        'search-box-visible': showSearch,
      })}
    >
      <div className="arco-popover-content !py-1.5 !px-3 flex items-center gap-[8px]">
        <Input
          ref={inputRef}
          placeholder="Markdown 内搜索"
          value={query}
          onChange={setQuery}
          suffix={
            <div className={cls('flex items-center gap-1', !query && 'invisible')}>
              <IconButton onClick={findPrev}>
                <IconLeft />
              </IconButton>
              <div>
                <span>{total && activeIndex != null ? activeIndex + 1 : 0}/</span>
                {total}
              </div>
              <IconButton onClick={findNext}>
                <IconRight />
              </IconButton>
            </div>
          }
        />
        <IconButton onClick={handClose}>
          <IconClose fontSize={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default React.memo(FindReplace);
