import { Image } from '@arco-design/web-react';
import React from 'react';

import { ReactComponent as IconImg } from '@/assets/icons/files/img.svg';
import { ReactComponent as IconUnknown } from '@/assets/icons/files/unknown.svg';

const icons = {
  jpeg: IconImg,
};

interface AttachIconProps {
  width?: number;
  height?: number;
  type?: string;
  imgUrl?: string;
  size?: number;
}

const AttachIcon: React.FC<AttachIconProps> = (props) => {
  const { type = '', imgUrl, size = 28 } = props;
  const width = props.width || size;
  const height = props.height || size;

  const IconComponent = icons[type] || IconUnknown;

  return (
    <Image
      src={imgUrl}
      className="attachment-image !inline-flex items-center justify-center"
      style={{ width, height }}
      error={<IconComponent className="arco-icon" style={{ fontSize: size }} />}
    />
  );
};

export default AttachIcon;
