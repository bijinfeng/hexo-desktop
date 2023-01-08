import { Typography } from '@arco-design/web-react';
import cls from 'classnames';
import React from 'react';

import IconButton from '@/components/icon-button';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  preIcon: React.ReactElement;
  subIcon?: React.ReactElement;
  bold?: boolean;
  onSubClick?: () => void;
}

const Item: React.FC<ItemProps> = (props) => {
  const { preIcon, subIcon, bold, children, onSubClick, ...rest } = props;
  return (
    <div
      {...rest}
      className={cls(
        rest.className,
        'hover:bg-fill-2 rounded-md cursor-pointer flex items-center gap-2 py-2 px-3',
      )}
    >
      {React.cloneElement(preIcon, { fontSize: 18 })}
      <Typography.Text className={cls('flex-1', { 'font-medium': bold })}>
        {children}
      </Typography.Text>
      {subIcon && (
        <IconButton className="mx-[3px]" onClick={onSubClick}>
          {React.cloneElement(subIcon, { fontSize: 18 })}
        </IconButton>
      )}
    </div>
  );
};

export default Item;
