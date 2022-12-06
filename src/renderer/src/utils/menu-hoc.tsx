import { Menu, MenuProps } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import { isEmpty } from 'lodash-es';
import React, { useCallback } from 'react';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export interface ActionItem {
  key: string;
  title: React.ReactNode;
  children?: ActionItem[];
}

export interface ActionMenuProps {
  actions: ActionItem[];
  selectedKeys?: string[];
  openKeys?: string[];
  onClickMenuItem?: MenuProps['onClickMenuItem'];
}

export interface DropProps {
  droplist?: React.ReactNode;
}

const menuHoc = <E extends DropProps>(
  Component: React.FC<E>,
): React.FC<E & ActionMenuProps> => {
  return function MenuAction(props) {
    const { selectedKeys, openKeys, onClickMenuItem, actions } = props;

    const renderItems = useCallback((items: ActionItem[]) => {
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
              {renderItems(drop.children as ActionItem[])}
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
      <Component
        {...props}
        droplist={
          <Menu
            icons={{ popArrowRight: <IconCaretRight fontSize={12} /> }}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClickMenuItem={onClickMenuItem}
          >
            {renderItems(actions)}
          </Menu>
        }
      />
    );
  };
};

export default menuHoc;
