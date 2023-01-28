import { Checkbox } from '@arco-design/web-react';
import {
  IconApps,
  IconArrowDown,
  IconArrowUp,
  IconList,
} from '@arco-design/web-react/icon';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ActionDropdown, { Action } from '@/components/action-dropdown';
import IconButtom from '@/components/icon-button';

import { AttchmentContext, SortDirection } from './context';

interface HeaderProps {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isList, setIsList }) => {
  const { t } = useTranslation();
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
        title: t('name'),
        sort: getSortDirection('fileName'),
        onClick: setSortDirection('fileName'),
      },
      {
        key: 'date',
        title: t('create-time'),
        sort: getSortDirection('date'),
        onClick: setSortDirection('date'),
      },
      {
        key: 'size',
        title: t('file-size'),
        sort: getSortDirection('size'),
        onClick: setSortDirection('size'),
      },
    ];
  }, [sorter, t]);

  const sortName = useMemo(
    () => actions.find((it) => it.key === sorter?.field)?.title,
    [sorter, actions],
  );

  return (
    <div className="flex items-center justify-between mb-3 px-2">
      <Checkbox onChange={onChangeAll} indeterminate={indeterminate} checked={checkAll}>
        {t('x-in-total', { total: data.length })}
      </Checkbox>
      <div className="inline-flex">
        <ActionDropdown actions={actions}>
          {sorter?.direction === 'ascend' ? <IconArrowUp /> : <IconArrowDown />}
          <span className="ml-1 text-xs">{t('sort-by-x', { type: sortName })}</span>
        </ActionDropdown>
        <IconButtom className="ml-4" onClick={() => setIsList(!isList)}>
          {isList ? <IconApps fontSize={16} /> : <IconList fontSize={16} />}
        </IconButtom>
      </div>
    </div>
  );
};

export default Header;
