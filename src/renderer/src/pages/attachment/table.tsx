import { Table, Typography } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { IconArrowDown, IconArrowUp } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { usePicgoStore } from '@/models/picgo';
import { formatFileSize } from '@/utils/format-file-size';

import Action from './action';
import AttachIcon from './attach-icon';
import { AttchmentContext, SortDirection } from './context';

const AttachmentTable: React.FC = () => {
  const { t } = useTranslation();
  const { picBeds } = usePicgoStore();
  const { selectedKeys, data, sorter, setSorter, setSelectedKeys } =
    useContext(AttchmentContext);

  const columns = useMemo<ColumnProps<PICGO.IPicAttachment>[]>(() => {
    const getHeaderCellCallback = (field: string) => () => ({
      onClick: () => {
        let direction: SortDirection = 'ascend';

        if (sorter?.field === field) {
          direction = sorter.direction === 'descend' ? 'ascend' : 'descend';
        }

        setSorter({ field, direction });
      },
    });

    const renderTitle = (title: string, field: string) => {
      const direction = sorter?.field === field ? sorter.direction : undefined;
      return (
        <div className="flex items-center gap-2">
          {title}
          {direction && (direction === 'ascend' ? <IconArrowUp /> : <IconArrowDown />)}
        </div>
      );
    };

    return [
      {
        title: renderTitle(t('name'), 'fileName'),
        dataIndex: 'fileName',
        headerCellStyle: { cursor: 'pointer' },
        onHeaderCell: getHeaderCellCallback('fileName'),
        render: (_col, item) => (
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center">
              <AttachIcon fit="cover" imgUrl={item.imgUrl} type={item.fileType} />
              <Typography.Text className="ml-4">{item.fileName}</Typography.Text>
            </div>
            <Action className="invisible group-hover:visible" />
          </div>
        ),
      },
      {
        title: renderTitle(t('create-time'), 'date'),
        dataIndex: 'date',
        headerCellStyle: { cursor: 'pointer' },
        onHeaderCell: getHeaderCellCallback('date'),
        render: (_col, item) => (
          <Typography.Text>{dayjs(item.date).format('YYYY/MM/DD HH:mm')}</Typography.Text>
        ),
      },
      {
        title: renderTitle(t('file-size'), 'size'),
        dataIndex: 'size',
        headerCellStyle: { cursor: 'pointer' },
        onHeaderCell: getHeaderCellCallback('size'),
        render: (_col, item) => (
          <Typography.Text>{formatFileSize(item.size)}</Typography.Text>
        ),
      },
      {
        title: t('image-hosting'),
        dataIndex: 'type',
        render: (_col, item) => (
          <Typography.Text>
            {picBeds.find((it) => it.type === item.type)?.name || '--'}
          </Typography.Text>
        ),
      },
    ];
  }, [sorter, picBeds]);

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
