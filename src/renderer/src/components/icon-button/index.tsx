import cls from 'classnames';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: number;
  active?: boolean;
}

const IconButton = (props: ButtonProps) => {
  const { children, className, active, size, disabled, ...rest } = props;

  return (
    <button
      className={cls(
        'inline-flex items-center justify-center p-0.5 text-text-2 rounded',
        'hover:bg-fill-3 active:bg-fill-3',
        { 'bg-fill-3': active },
        { 'opacity-40': disabled },
        className,
      )}
      disabled={disabled}
      style={size ? { fontSize: size } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
