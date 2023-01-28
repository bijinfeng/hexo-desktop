import { Menu as ArcoMenu, MenuProps } from '@arco-design/web-react';
import { IconArrowDown, IconArrowUp, IconCaretRight } from '@arco-design/web-react/icon';
import cls from 'classnames';
import { get, isEmpty } from 'lodash-es';
import React, { useCallback } from 'react';
import { RiCheckFill } from 'react-icons/ri';

const SubMenu = ArcoMenu.SubMenu;
const MenuItem = ArcoMenu.Item;

export interface DividerItem {
  type: 'divider';
}

export interface Action {
  key: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  sort?: 'ascend' | 'descend';
  isChecked?: boolean;
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

const isDivider = (item: ActionItem): item is DividerItem => {
  return get(item, 'type') === 'divider';
};

export const renderMenu = (props: ActionMenuProps) => {
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
          className={cls(
            'hexo-menu-item flex items-center justify-between',
            drop.className,
          )}
          key={drop.key}
          onClick={drop.onClick}
        >
          <div className="flex items-center gap-2">
            {drop.icon}
            {drop.title}
          </div>
          {drop.sort === 'ascend' && <IconArrowUp />}
          {drop.sort === 'descend' && <IconArrowDown />}
          {drop.isChecked && <RiCheckFill />}
        </MenuItem>
      );
    });
  }, []);

  return (
    <ArcoMenu
      icons={{ popArrowRight: <IconCaretRight fontSize={12} /> }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClickMenuItem={onClickMenuItem}
      onClick={(e) => e.stopPropagation()}
    >
      {renderItems(actions)}
    </ArcoMenu>
  );
};

export const Menu: React.FC<ActionMenuProps> = (props) => renderMenu(props);

export interface DropProps {
  droplist?: React.ReactNode;
}

export const menuHoc = <E extends DropProps>(
  Component: React.FC<E>,
): React.FC<E & ActionMenuProps> => {
  return function MenuAction(props) {
    return <Component {...props} droplist={renderMenu(props)} />;
  };
};
