import { Image } from '@arco-design/web-react';
import cls from 'classnames';
import mime from 'mime';
import React from 'react';

import { ReactComponent as IconImg } from '@/assets/icons/files/img.svg';
import { ReactComponent as IconUnknown } from '@/assets/icons/files/unknown.svg';

const icons = {
  [`${mime.getType('jeeg')}`]: IconImg,
};

interface AttachIconProps {
  width?: number;
  height?: number;
  type?: string;
  imgUrl?: string;
  size?: number;
  fit?: 'cover';
}

const pickFileIcon = (mime: string) => {
  if (mime.startsWith('image')) {
    return IconImg;
  }

  return icons[mime] || IconUnknown;
};

const AttachIcon: React.FC<AttachIconProps> = (props) => {
  const { type = '', imgUrl, fit, size = 28 } = props;
  const width = props.width || size;
  const height = props.height || size;

  const IconComponent = pickFileIcon(type);

  return (
    <Image
      src={imgUrl}
      className={cls('attachment-image !inline-flex items-center justify-center', {
        'attachment-image-cover': fit === 'cover',
      })}
      style={{ width, height }}
      error={<IconComponent className="arco-icon" style={{ fontSize: size }} />}
    />
  );
};

export default AttachIcon;
