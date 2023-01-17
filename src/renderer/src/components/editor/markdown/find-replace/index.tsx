import { Input } from '@arco-design/web-react';
import type { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { IconClose, IconLeft, IconRight } from '@arco-design/web-react/icon';
import { useKeyPress } from 'ahooks';
import cls from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

export interface FindReplaceProps {
  nodeRef: React.RefObject<HTMLElement>;
}

const FindReplace: React.FC<FindReplaceProps> = ({ nodeRef }) => {
  const inputRef = useRef<RefInputType>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);

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
    // stopFind();
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
          // value={query}
          // onChange={setQuery}
          suffix={
            <div className={cls('flex items-center gap-1', 'invisible')}>
              <IconButton>
                <IconLeft />
              </IconButton>
              <div>
                <span>1/</span>
                10
              </div>
              <IconButton>
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
