import { Empty, Image, Space } from '@arco-design/web-react';
import { isEmpty } from 'lodash-es';
import React from 'react';

import type { IImgInfo } from '@/models/picgo';

export interface ImageListProps {
  getPopupContainer?: () => HTMLElement;
  data: IImgInfo[];
}

const ImageList: React.FC<ImageListProps> = ({ getPopupContainer, data }) => {
  if (isEmpty(data))
    return (
      <div className="h-full flex items-center justify-center">
        <Empty
          className="!w-auto inline-flex"
          imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
        />
      </div>
    );

  return (
    <Image.PreviewGroup infinite getPopupContainer={getPopupContainer}>
      <Space>
        {data.map((item, index) => (
          <Image key={index} src={item.imgUrl} width={200} alt={`lamp${index + 1}`} />
        ))}
      </Space>
    </Image.PreviewGroup>
  );
};

export default ImageList;
