import { Checkbox, Grid, Typography } from '@arco-design/web-react';
import cls from 'classnames';
import dayjs from 'dayjs';
import React, { useContext } from 'react';

import IconButton from '@/components/icon-button';

import Action from './action';
import AttachIcon from './attach-icon';
import { AttchmentContext } from './context';

const Card: React.FC = () => {
  const { data, selectedKeys, setSelectedKeys } = useContext(AttchmentContext);

  const handleCheck = (checked: boolean, id: string) => {
    setSelectedKeys(
      checked ? [...selectedKeys, id] : selectedKeys.filter((it) => it !== id),
    );
  };

  return (
    <Grid.Row>
      {data.map((item, index) => {
        const checked = selectedKeys.includes(item.id);

        return (
          <Grid.Col
            xs={6}
            xl={4}
            className="!flex items-center justify-center"
            key={item.id || index}
          >
            <div
              className={cls(
                'group relative px-2 py-3 hover:bg-fill-1 box-content rounded-lg',
                { 'bg-fill-1': checked },
              )}
            >
              <div className="flex flex-col items-center">
                <AttachIcon
                  size={70}
                  width={100}
                  height={90}
                  imgUrl={item.imgUrl}
                  type={item.fileType}
                />
                <div className="w-28 text-center">
                  <Typography.Paragraph
                    className="max-w-full !mt-3 !mb-0.5"
                    ellipsis={{ rows: 2, cssEllipsis: true, expandable: false }}
                  >
                    {item.fileName}
                  </Typography.Paragraph>
                  <span className="text-xs">
                    {dayjs(item.date).format('YYYY/MM/DD HH:mm')}
                  </span>
                </div>
              </div>

              <IconButton
                className={cls(
                  'hidden group-hover:inline-flex absolute w-6 h-6 top-1 left-1',
                  { '!inline-flex': checked },
                )}
                active
              >
                <Checkbox
                  onChange={(c) => handleCheck(c, item.id)}
                  checked={checked}
                  className="!p-0"
                />
              </IconButton>
              <Action
                size={20}
                active
                className="hidden group-hover:inline-flex absolute top-1 right-1"
              />
            </div>
          </Grid.Col>
        );
      })}
    </Grid.Row>
  );
};

export default Card;
