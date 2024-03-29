import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as IconDelete } from '@/assets/icons/slider-delete.svg';
import { ReactComponent as IconFile } from '@/assets/icons/slider-file.svg';
import { ReactComponent as IconImage } from '@/assets/icons/slider-image.svg';
import { ReactComponent as IconStar } from '@/assets/icons/slider-start.svg';
import IconButton from '@/components/icon-button';
import { AppEventManager, EventType } from '@/event';

const Slider: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const onClickMenuItem = () => {
    AppEventManager.emit(EventType.CLOSE_SETTING);
  };

  const sliders = useMemo(
    () => [
      {
        key: 'notes',
        label: t('notes'),
        icon: <IconFile />,
        router: '/notes',
      },
      {
        key: 'favorites',
        label: t('favorites'),
        icon: <IconStar />,
        router: '/collect',
      },
      {
        key: 'trash',
        label: t('trash'),
        icon: <IconDelete />,
        router: '/trash',
      },
      {
        key: 'attachment',
        label: t('attachment'),
        icon: <IconImage />,
        router: '/attachment',
      },
    ],
    [t],
  );

  return (
    <div className="w-[60px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        {sliders.map((item) => (
          <Link to={item.router} key={item.key}>
            <IconButton
              onClick={onClickMenuItem}
              active={item.router === location.pathname}
              className="flex flex-col w-[48px] h-[48px] mb-2"
              size={22}
            >
              {item.icon}
              <span className="text-[10px] mt-1">{item.label}</span>
            </IconButton>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slider;
