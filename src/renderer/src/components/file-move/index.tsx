import { Card, Modal, Tree, TreeProps } from '@arco-design/web-react';
import { IconFolderDelete } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';

import FileName from '@/components/file-name';
import { AppEventManager, EventType } from '@/event';

import styles from './style.module.less';

const FileMove: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);

    AppEventManager.on(EventType.OPEN_FILE_MOVE_MODAL, handleOpen);

    return () => {
      AppEventManager.removeListener(EventType.OPEN_FILE_MOVE_MODAL, handleOpen);
    };
  }, []);

  const onOk = () => {
    setVisible(false);
  };

  const treeData: TreeProps['treeData'] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      icon: <IconFolderDelete />,
      children: [
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          selectable: false,
          icon: <IconFolderDelete />,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
              icon: <IconFolderDelete />,
              children: [
                {
                  title: 'Leafsss 0-0-2',
                  key: '0-0-2-1-0',
                  icon: <IconFolderDelete />,
                  children: [
                    {
                      title: 'Leaf',
                      key: '0-0-2-1-0-0',
                      icon: <IconFolderDelete />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <Modal
      title="移动到"
      visible={visible}
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <FileName name="无标题Markdown.md" />
      <div className={styles.target}>
        <span>移动到:</span>
        <span className={styles.path}></span>
      </div>
      <Card className="rounded">
        <Tree treeData={treeData}></Tree>
      </Card>
    </Modal>
  );
};

export const fileMove = () => {
  AppEventManager.emit(EventType.OPEN_FILE_MOVE_MODAL);
};

export default FileMove;
