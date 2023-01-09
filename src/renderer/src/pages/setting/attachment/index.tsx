import {
  Badge,
  Divider,
  Message,
  Space,
  Table,
  TableProps,
  Typography,
} from '@arco-design/web-react';
import { IconCheck } from '@arco-design/web-react/icon';
import React, { useMemo, useRef } from 'react';

import { usePicgoStore } from '@/models/picgo';

import Card from '../card';
import ConfigForm, { FormRef } from './config-form';

const Attachment: React.FC = () => {
  const formRef = useRef<FormRef>(null);
  const { picBeds, defaultPicBed, setDefaultPicBed } = usePicgoStore();

  const colums = useMemo<TableProps<PICGO.IPicBedType>['columns']>(
    () => [
      {
        title: '默认图床',
        width: 120,
        render: (_, record) =>
          defaultPicBed === record.type ? (
            <IconCheck style={{ color: 'rgb(var(--success-6))' }} />
          ) : null,
      },
      {
        title: '图床',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'visible',
        width: 120,
        render: (_, record) => (
          <Badge
            status={record.visible ? 'success' : 'warning'}
            text={record.visible ? '启用' : '停用'}
          />
        ),
      },
      {
        title: '操作',
        width: 100,
        render: (_, record) => (
          <Space split={<Divider type="vertical" />}>
            <Typography.Text
              type="primary"
              className="cursor-pointer"
              onClick={() => formRef.current?.show(record)}
            >
              编辑
            </Typography.Text>
          </Space>
        ),
      },
    ],
    [defaultPicBed],
  );

  return (
    <Card title="附件设置">
      <Table
        pagination={false}
        data={picBeds}
        columns={colums}
        rowKey={(record) => record.type}
        onRow={(record) => ({
          onDoubleClick: () => {
            setDefaultPicBed(record.type);
            Message.success('设置成功');
          },
        })}
      />
      <ConfigForm ref={formRef} />
    </Card>
  );
};

export default Attachment;
