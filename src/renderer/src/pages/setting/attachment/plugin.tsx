import { Button, Input, Typography } from '@arco-design/web-react';
import React from 'react';

const Plugin: React.FC = () => {
  return (
    <>
      <Typography.Title heading={6}>插件</Typography.Title>
      <div className="flex gap-2">
        <Input placeholder="搜索 npm 上的 PicGo 插件" />
        <Button>插件列表</Button>
        <Button>导入本地插件</Button>
      </div>
      <div className="top-2"></div>
    </>
  );
};

export default Plugin;
