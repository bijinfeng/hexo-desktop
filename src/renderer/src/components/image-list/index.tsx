import { Image, Pagination, Space } from '@arco-design/web-react';
import React, { useState } from 'react';

import styles from './style.module.less';

const srcList = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
];

export interface ImageListProps {
  getPopupContainer?: () => HTMLElement;
}

const ImageList: React.FC<ImageListProps> = ({ getPopupContainer }) => {
  const [current, setCurrent] = useState(0);

  return (
    <Space direction="vertical" size="large" className={styles.wrapper}>
      <Image.PreviewGroup infinite getPopupContainer={getPopupContainer}>
        <Space>
          {srcList.map((src, index) => (
            <Image key={index} src={src} width={200} alt={`lamp${index + 1}`} />
          ))}
        </Space>
      </Image.PreviewGroup>
      <div className={styles.bottom}>
        <Pagination
          showTotal
          total={srcList.length}
          sizeCanChange
          hideOnSinglePage
          current={current}
          onChange={setCurrent}
        />
      </div>
    </Space>
  );
};

export default ImageList;
