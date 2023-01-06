import { Table, Typography } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { IconMore } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';

import ActionDropdown, { ActionItem } from '@/components/action-dropdown';

import AttachIcon from './attach-icon';
import { AttchmentContext } from './context';

const AttachmentTable: React.FC = () => {
  const { selectedKeys, data, setSelectedKeys } = useContext(AttchmentContext);

  const columns = useMemo<ColumnProps<PICGO.IPicAttachment>[]>(() => {
    const actions: ActionItem[] = [
      {
        key: 'download',
        title: '下载',
      },
      {
        key: 'delete',
        title: '删除',
      },
    ];

    return [
      {
        title: '名称',
        dataIndex: 'fileName',
        render: (_col, item) => (
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center">
              <AttachIcon imgUrl={item.imgUrl} type={item.extname} />
              <Typography.Text className="ml-4">{item.fileName}</Typography.Text>
            </div>
            <ActionDropdown actions={actions} className="invisible group-hover:visible">
              <IconMore />
            </ActionDropdown>
          </div>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'date',
        render: (_col, item) => {
          const timestamp = item.date || item.updated;
          const formatTime = timestamp
            ? dayjs(timestamp).format('YYYY-MM-DD HH:mm')
            : '--';
          return <Typography.Text>{formatTime}</Typography.Text>;
        },
      },
      {
        title: '图床',
        dataIndex: 'type',
        render: (_col, item) => <Typography.Text>{item.type}</Typography.Text>,
      },
    ];
  }, []);

  return (
    <Table
      border={false}
      pagination={false}
      data={data}
      columns={columns}
      rowKey="id"
      rowClassName={() => 'group'}
      rowSelection={{
        type: 'checkbox',
        checkAll: false,
        selectedRowKeys: selectedKeys,
        onChange: setSelectedKeys,
      }}
    />
  );
};

export default React.memo(AttachmentTable);
