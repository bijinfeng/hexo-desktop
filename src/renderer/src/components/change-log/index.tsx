import { Space, Typography } from '@arco-design/web-react';
import React from 'react';

interface ChangeLogProps {
  html: string;
}

const ChangeLog: React.FC<ChangeLogProps> = ({ html }) => {
  return (
    <Space direction="vertical">
      <Typography.Text bold>更新详情</Typography.Text>
      <article className="prose prose-sm" dangerouslySetInnerHTML={{ __html: html }} />
    </Space>
  );
};

export default ChangeLog;
