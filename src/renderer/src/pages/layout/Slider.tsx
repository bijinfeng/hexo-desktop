import { Popover } from '@arco-design/web-react';
import cls from 'classnames';
import { find } from 'lodash-es';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconDelete } from '@/assets/icons/slider-delete.svg';
import { ReactComponent as IconFile } from '@/assets/icons/slider-file.svg';
import { ReactComponent as IconFolder } from '@/assets/icons/slider-folder.svg';
import { ReactComponent as IconStar } from '@/assets/icons/slider-start.svg';
import IconButton from '@/components/icon-button';

import styles from './style.module.less';

const sliders = [
  {
    key: 'notes',
    label: '笔记',
    icon: <IconFile />,
    router: '/notes',
  },
  {
    key: 'notebooks',
    label: '我的文件夹',
    icon: <IconFolder />,
    router: '/notes',
  },
  {
    key: 'favorites',
    label: '我的收藏',
    icon: <IconStar />,
    router: '/notes',
  },
  {
    key: 'trash',
    label: '回收站',
    icon: <IconDelete />,
    router: '/notes',
  },
];

const Slider: React.FC = () => {
  const navigate = useNavigate();

  const onClickMenuItem = (key: string) => {
    const target = find(sliders, (it) => it.key === key);
    target && navigate(target.router);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.menu}>
        {sliders.map((item) => (
          <Popover key={item.key} content={item.label} position="right">
            <IconButton
              onClick={() => onClickMenuItem(item.key)}
              className={styles.button}
            >
              {React.cloneElement(item.icon, {
                className: cls('arco-icon', styles.icon),
              })}
            </IconButton>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default Slider;
