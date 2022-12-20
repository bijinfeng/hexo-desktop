import { find } from 'lodash-es';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconDelete } from '@/assets/icons/slider-delete.svg';
import { ReactComponent as IconFile } from '@/assets/icons/slider-file.svg';
import { ReactComponent as IconImage } from '@/assets/icons/slider-image.svg';
import { ReactComponent as IconStar } from '@/assets/icons/slider-start.svg';
import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

const sliders = [
  {
    key: 'notes',
    label: '笔记',
    icon: <IconFile />,
    router: '/notes',
  },
  {
    key: 'favorites',
    label: '收藏',
    icon: <IconStar />,
    router: '/notes',
  },
  {
    key: 'attachment',
    label: '附件',
    icon: <IconImage />,
    router: '/attachment',
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
  const [activeTab, setActiveTab] = useState('notes');

  const onClickMenuItem = (key: string) => {
    setActiveTab(key);
    AppEventManager.emit(EventType.CLOSE_SETTING);
    const target = find(sliders, (it) => it.key === key);
    target && navigate(target.router);
  };

  return (
    <div className="w-[60px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        {sliders.map((item) => (
          <IconButton
            key={item.key}
            onClick={() => onClickMenuItem(item.key)}
            active={item.key === activeTab}
            className="flex flex-col w-[50px] h-[50px] mb-2"
            size={25}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default Slider;
