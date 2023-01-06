import {
  IconCloseCircleFill,
  IconDelete,
  IconDownload,
} from '@arco-design/web-react/icon';
import { isEmpty } from 'lodash-es';
import React, { useCallback, useContext, useRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';

import IconButton from '@/components/icon-button';

import { AttchmentContext } from './context';

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: { bottom: 52 },
  entered: { bottom: 52 },
  exiting: { bottom: -52 },
  exited: { bottom: -52 },
  unmounted: {},
};

const Toolbar: React.FC = () => {
  const nodeRef = useRef(null);
  const { selectedKeys, setSelectedKeys, onDelete } = useContext(AttchmentContext);

  const visible = !isEmpty(selectedKeys);

  const setVisible = useCallback((visible: boolean) => {
    if (!visible) {
      setSelectedKeys([]);
    }
  }, []);

  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={300}>
      {(state) => (
        <div
          ref={nodeRef}
          className="flex gap-2 px-4 py-2 bottom-0 transition-[bottom] duration-300 ease-in fixed left-2/4 -translate-x-2/4 bg-fill-2 rounded-lg shadow-sm"
          style={transitionStyles[state]}
        >
          <IconButton className="p-1.5" tooltip="下载">
            <IconDownload fontSize={18} />
          </IconButton>
          <IconButton
            className="p-1.5"
            tooltip="删除"
            onClick={() => onDelete(selectedKeys)}
          >
            <IconDelete fontSize={18} />
          </IconButton>
          <IconButton
            className="p-1.5"
            tooltip="取消多选"
            onClick={() => setVisible(false)}
          >
            <IconCloseCircleFill fontSize={18} />
          </IconButton>
        </div>
      )}
    </Transition>
  );
};

export default Toolbar;
