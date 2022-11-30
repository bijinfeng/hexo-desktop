import './style.less';

import { Dropdown, Menu, MenuProps, TriggerProps } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import { isEmpty } from 'lodash-es';
import React, { useCallback } from 'react';

import IconButton from '@/components/icon-button';

export interface DropItem {
  key: string;
  title: React.ReactNode;
  children?: DropItem[];
}

export interface ActionDropdownProps {
  drops: DropItem[];
  children: React.ReactNode;
  selectedKeys?: string[];
  openKeys?: string[];
  className?: string;
  position?: TriggerProps['position'];
  onClickMenuItem?: MenuProps['onClickMenuItem'];
}

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const ActionDropdown: React.FC<ActionDropdownProps> = (props) => {
  const {
    className,
    children,
    drops,
    position = 'br',
    onClickMenuItem,
    selectedKeys,
    openKeys,
  } = props;

  const renderItems = useCallback((items: DropItem[]) => {
    return items.map((drop) => {
      const hasChildren = !isEmpty(drop?.children);

      if (hasChildren) {
        return (
          <SubMenu
            className="hexo-sub-menu"
            key={drop.key}
            title={drop.title}
            selectable={false}
          >
            {renderItems(drop.children as DropItem[])}
          </SubMenu>
        );
      }

      return (
        <MenuItem className="hexo-menu-item" key={drop.key}>
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
          selectedKeys={selectedKeys}
          openKeys={openKeys}
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
