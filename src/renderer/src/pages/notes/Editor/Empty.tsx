import React from 'react';

import { ReactComponent as EmptyIllu } from '@/assets/icons/empty-illu.svg';

const Empty: React.FC = () => {
  return (
    <div className="flex text-[150px] opacity-40 h-full items-center justify-center">
      <EmptyIllu />
    </div>
  );
};

export default Empty;
