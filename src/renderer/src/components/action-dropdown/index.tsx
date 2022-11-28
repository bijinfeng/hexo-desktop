import { Dropdown, Menu, MenuProps, TriggerProps } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import { isEmpty } from 'lodash-es';
import React, { useCallback } from 'react';

import IconButton from '@/components/icon-button';

import styles from './style.module.less';

export interface DropItem {
  key: string;
  title: string;
  children?: DropItem[];
}

export interface ActionDropdownProps {
  className?: string;
  position?: TriggerProps['position'];
  onClickMenuItem?: MenuProps['onClickMenuItem'];
  drops: DropItem[];
  children: React.ReactNode;
}

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const ActionDropdown: React.FC<ActionDropdownProps> = (props) => {
  const { className, children, drops, position = 'br', onClickMenuItem } = props;

  const renderItems = useCallback((items: DropItem[]) => {
    return items.map((drop) => {
      const hasChildren = !isEmpty(drop?.children);

      if (hasChildren) {
        return (
          <SubMenu className={styles.item} key={drop.key} title={drop.title}>
            {renderItems(drop.children!)}
          </SubMenu>
        );
      }

      return (
        <MenuItem className={styles.item} key={drop.key}>
          {drop.title}
        </MenuItem>
      );
    });
  }, []);

  return (
    <Dropdown
      trigger="click"
      droplist={
        <Menu
          icons={{ popArrowRight: <IconCaretRight fontSize={12} /> }}
          onClickMenuItem={onClickMenuItem}
        >
          {renderItems(drops)}
        </Menu>
      }
      triggerProps={{ autoFixPosition: false, position }}
    >
      <IconButton className={className}>{children}</IconButton>
    </Dropdown>
  );
};

export default ActionDropdown;
