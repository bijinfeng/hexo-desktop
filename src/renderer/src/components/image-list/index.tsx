import { Empty, Image, Space } from '@arco-design/web-react';
import { isEmpty } from 'lodash-es';
import React from 'react';

export interface ImageListProps {
  getPopupContainer?: () => HTMLElement;
  srcList: string[];
}

const ImageList: React.FC<ImageListProps> = ({ getPopupContainer, srcList }) => {
  if (isEmpty(srcList))
    return (
      <Empty
        className="flex flex-col items-center"
        imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
      />
    );

  return (
    <Image.PreviewGroup infinite getPopupContainer={getPopupContainer}>
      <Space>
        {srcList.map((src, index) => (
          <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
        ))}
      </Space>
    </Image.PreviewGroup>
  );
};

export default ImageList;
