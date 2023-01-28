import { Divider, Input } from '@arco-design/web-react';
import type { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { IconClose } from '@arco-design/web-react/icon';
import cls from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  RiArrowDownLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowUpLine,
  RiFontSize,
} from 'react-icons/ri';

import { ReactComponent as EnableRegex } from '@/assets/icons/enable-regex.svg';
import { ReactComponent as MatchWholeWord } from '@/assets/icons/match-whole-word.svg';
import { ReactComponent as Replace } from '@/assets/icons/replace.svg';
import { ReactComponent as ReplaceAll } from '@/assets/icons/replace-all.svg';
import { ReactComponent as ToggleReplace } from '@/assets/icons/toggle-replace.svg';
import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

import { useMarkdownContext } from '../context';
import type { SearchStorage } from '../extensions/search-replace';

const FindReplace: React.FC = () => {
  const { editor } = useMarkdownContext();
  const { isSearching, selectedText, results, selectedIndex } = editor.storage
    .searchreplace as SearchStorage;
  const inputRef = useRef<RefInputType>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [enableRegex, setEnableRegex] = useState(false);
  const replaceText = useRef('');

  const handleOpen = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    AppEventManager.on(EventType.VISIBLE_FILE_SEARCH, handleOpen);
    return () => {
      AppEventManager.removeListener(EventType.VISIBLE_FILE_SEARCH, handleOpen);
    };
  }, [handleOpen]);

  const handClose = () => {
    editor.chain().focus().endSearch().run();
  };

  const handleSerch = (term: string) => {
    editor.commands.search(term, {
      matchCase,
      enableRegex,
      matchWholeWord,
    });
  };

  return (
    <div
      className={cls(
        'absolute !w-1/2 min-w-[380px] max-w-[480px] right-2.5 top-2.5',
        'search-box',
        { 'search-box-visible': isSearching },
      )}
    >
      <div className="arco-popover-content !py-1.5 !px-2">
        <div className="flex items-center gap-1">
          <Input
            ref={inputRef}
            placeholder="搜索"
            defaultValue={selectedText}
            onChange={handleSerch}
            suffix={
              <div className={cls('flex items-center')}>
                <div className="flex items-center text-base	gap-1">
                  <IconButton
                    active={isExpanded}
                    onClick={() => setIsExpanded((bol) => !bol)}
                  >
                    {isExpanded ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
                  </IconButton>
                  {isExpanded && (
                    <>
                      <IconButton
                        active={matchCase}
                        onClick={() => setMatchCase((bol) => !bol)}
                      >
                        <RiFontSize />
                      </IconButton>
                      <IconButton
                        active={matchWholeWord}
                        onClick={() => setMatchWholeWord((bol) => !bol)}
                      >
                        <MatchWholeWord />
                      </IconButton>
                      <IconButton
                        active={enableRegex}
                        onClick={() => setEnableRegex((bol) => !bol)}
                      >
                        <EnableRegex />
                      </IconButton>
                    </>
                  )}
                </div>
                <Divider type="vertical" className="!mx-1.5" />
                <span>{results ? `${selectedIndex + 1}/${results.length}` : ''}</span>
              </div>
            }
          />
          <div className="text-lg flex items-center gap-1">
            <IconButton active={isReplacing} onClick={() => setIsReplacing(!isReplacing)}>
              <ToggleReplace />
            </IconButton>
            <IconButton onClick={() => editor.commands.moveToPreviousResult()}>
              <RiArrowUpLine />
            </IconButton>
            <IconButton onClick={() => editor.commands.moveToNextResult()}>
              <RiArrowDownLine />
            </IconButton>
            <IconButton onClick={handClose}>
              <IconClose />
            </IconButton>
          </div>
        </div>
        {isReplacing && (
          <div className="flex items-center gap-1 mt-1.5">
            <Input
              placeholder="替换"
              onChange={(e) => (replaceText.current = e)}
              className="flex-1"
            />
            <div className="w-[100px] text-lg flex items-center gap-1">
              <IconButton onClick={() => editor.commands.replace(replaceText.current)}>
                <Replace />
              </IconButton>
              <IconButton onClick={() => editor.commands.replaceAll(replaceText.current)}>
                <ReplaceAll />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(FindReplace);
