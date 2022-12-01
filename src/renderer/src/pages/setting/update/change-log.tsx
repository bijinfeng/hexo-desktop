import { useRequest } from 'ahooks';
import React from 'react';

import { getChangelog } from '@/utils/changelog';

interface ChangeLogProps {
  tag: string;
}

const ChangeLog: React.FC<ChangeLogProps> = ({ tag }) => {
  const { data } = useRequest(() => getChangelog(tag), {
    cacheKey: tag,
  });

  if (!data) return null;

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

export default ChangeLog;
