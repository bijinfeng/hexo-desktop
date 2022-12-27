import { Card } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';

import IconButtom from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

import styles from './style.module.less';

const portalHoc = (Component: React.FC) => {
  return function PortalContainer() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const open = () => setVisible(true);
      const close = () => setVisible(false);

      AppEventManager.addListener(EventType.OPEN_SETTING, open);
      AppEventManager.addListener(EventType.CLOSE_SETTING, close);
      return () => {
        AppEventManager.removeListener(EventType.OPEN_SETTING, open);
        AppEventManager.removeListener(EventType.CLOSE_SETTING, close);
      };
    }, []);

    return (
      <Card
        className={styles.portal}
        title="设置"
        bordered={false}
        bodyStyle={{ padding: 0, flex: 1, overflow: 'hidden' }}
        style={{ display: visible ? 'flex' : 'none' }}
        extra={
          <IconButtom onClick={() => setVisible(false)}>
            <IconClose style={{ fontSize: 20 }} />
          </IconButtom>
        }
      >
        <Component />
      </Card>
    );
  };
};

export default portalHoc;
