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
import React, { useMemo } from 'react';

import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

const BedList: React.FC = () => {
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
              onClick={() => {
                AppEventManager.emit(EventType.OPEN_BED_CONFIG_MODAL, record);
              }}
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
    <>
      <Typography.Title heading={6}>系统内置图床</Typography.Title>
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
    </>
  );
};

export default BedList;
