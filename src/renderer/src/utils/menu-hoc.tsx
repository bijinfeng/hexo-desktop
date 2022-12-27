import { Menu, MenuProps } from '@arco-design/web-react';
import { IconCaretRight } from '@arco-design/web-react/icon';
import cls from 'classnames';
import { get, isEmpty } from 'lodash-es';
import React, { useCallback } from 'react';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export interface DividerItem {
  type: 'divider';
}

export interface Action {
  key: string;
  title: React.ReactNode;
  className?: string;
  children?: ActionItem[];
  onClick?: () => void;
}

export type ActionItem = DividerItem | Action;

export interface ActionMenuProps {
  actions: ActionItem[];
  selectedKeys?: string[];
  openKeys?: string[];
  onClickMenuItem?: MenuProps['onClickMenuItem'];
}

export interface DropProps {
  droplist?: React.ReactNode;
}

const isDivider = (item: ActionItem): item is DividerItem => {
  return get(item, 'type') === 'divider';
};

const menuHoc = <E extends DropProps>(
  Component: React.FC<E>,
): React.FC<E & ActionMenuProps> => {
  return function MenuAction(props) {
    const { selectedKeys, openKeys, onClickMenuItem, actions } = props;

    const renderItems = useCallback((items: ActionItem[]) => {
      return items.map((drop, index) => {
        if (isDivider(drop)) {
          return <div key={index} className="!mx-[12px] border-t border-fill-3" />;
        }

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
          <MenuItem
            className={cls('hexo-menu-item', drop.className)}
            key={drop.key}
            onClick={drop.onClick}
          >
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
            onClick={(e) => e.stopPropagation()}
          >
            {renderItems(actions)}
          </Menu>
        }
      />
    );
  };
};

export default menuHoc;
