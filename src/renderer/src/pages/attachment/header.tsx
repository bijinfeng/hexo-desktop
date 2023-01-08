import { Checkbox } from '@arco-design/web-react';
import {
  IconApps,
  IconArrowDown,
  IconArrowUp,
  IconList,
} from '@arco-design/web-react/icon';
import React, { useContext, useMemo } from 'react';

import ActionDropdown, { Action } from '@/components/action-dropdown';
import IconButtom from '@/components/icon-button';

import { AttchmentContext, SortDirection } from './context';

interface HeaderProps {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isList, setIsList }) => {
  const { data, selectedKeys, sorter, setSorter, onChangeAll } =
    useContext(AttchmentContext);
  const checkAll = data?.length === selectedKeys?.length;
  const indeterminate = !checkAll && selectedKeys && selectedKeys?.length > 0;

  const actions = useMemo<Action[]>(() => {
    const getSortDirection = (field: string) => {
      if (sorter?.field === field) {
        return sorter.direction;
      }
      return undefined;
    };

    const setSortDirection = (field: string) => () => {
      let direction: SortDirection = 'ascend';

      if (sorter?.field === field) {
        direction = sorter.direction === 'descend' ? 'ascend' : 'descend';
      }

      setSorter({ field, direction });
    };

    return [
      {
        key: 'fileName',
        title: '名称',
        sort: getSortDirection('fileName'),
        onClick: setSortDirection('fileName'),
      },
      {
        key: 'date',
        title: '创建时间',
        sort: getSortDirection('date'),
        onClick: setSortDirection('date'),
      },
      {
        key: 'size',
        title: '文件大小',
        sort: getSortDirection('size'),
        onClick: setSortDirection('size'),
      },
    ];
  }, [sorter]);

  const sortName = useMemo(
    () => actions.find((it) => it.key === sorter?.field)?.title,
    [sorter, actions],
  );

  return (
    <div className="flex items-center justify-between mb-3 px-2">
      <Checkbox onChange={onChangeAll} indeterminate={indeterminate} checked={checkAll}>
        共 {data.length} 项
      </Checkbox>
      <div className="inline-flex">
        <ActionDropdown actions={actions}>
          {sorter?.direction === 'ascend' ? <IconArrowUp /> : <IconArrowDown />}
          <span className="ml-1 text-xs">按{sortName}排序</span>
        </ActionDropdown>
        <IconButtom className="ml-4" onClick={() => setIsList(!isList)}>
          {isList ? <IconApps fontSize={16} /> : <IconList fontSize={16} />}
        </IconButtom>
      </div>
    </div>
  );
};

export default Header;
