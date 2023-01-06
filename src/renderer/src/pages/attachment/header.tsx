import { Checkbox } from '@arco-design/web-react';
import { IconApps, IconList } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';

import { ReactComponent as IconSort } from '@/assets/icons/sort.svg';
import IconButtom from '@/components/icon-button';

import { AttchmentContext } from './context';

interface HeaderProps {
  isList: boolean;
  setIsList: (isList: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isList, setIsList }) => {
  const { data, selectedKeys, onChangeAll } = useContext(AttchmentContext);
  const checkAll = data.length === selectedKeys?.length;
  const indeterminate = !checkAll && selectedKeys && selectedKeys?.length > 0;

  return (
    <div className="flex items-center justify-between mb-3 px-2">
      <Checkbox onChange={onChangeAll} indeterminate={indeterminate} checked={checkAll}>
        共 {data.length} 项
      </Checkbox>
      <div className="inline-flex">
        <IconButtom>
          <IconSort fontSize={16} />
          <span className="ml-1 text-xs">按名称排序</span>
        </IconButtom>
        <IconButtom className="ml-4" onClick={() => setIsList(!isList)}>
          {isList ? <IconApps fontSize={16} /> : <IconList fontSize={16} />}
        </IconButtom>
      </div>
    </div>
  );
};

export default Header;
