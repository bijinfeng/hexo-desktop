import { Button, Empty, Input, Spin, Typography } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { isEmpty } from 'lodash-es';
import React, { useState } from 'react';

import { usePicgoStore } from '@/models/picgo';
import { openUrl } from '@/utils/open-url';

import { PluginInstalledCard, PluginSearchCard } from './plugin-card';
import { getSearchResult } from './service';

const goAwesomeList = () => openUrl('https://github.com/PicGo/Awesome-PicGo');

const Plugin: React.FC = () => {
  const [searchText, setSearchText] = useState<string>();
  const importLocalPlugin = usePicgoStore((state) => state.importLocalPlugin);
  const pluginList = usePicgoStore((state) => state.pluginList);
  const {
    run,
    loading,
    data = [],
  } = useRequest(getSearchResult, {
    manual: true,
    debounceWait: 300,
    cacheKey: 'cacheKey-demo',
  });

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);

    if (text) {
      const npmSearchText = text.match('picgo-plugin-') ? text : `picgo-plugin-${text}`;
      run(npmSearchText);
    }
  };

  const renderSearchList = () => {
    if (isEmpty(data)) {
      return <Empty />;
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <PluginSearchCard key={item.name} item={item} />
        ))}
      </div>
    );
  };

  const renderPluginList = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {pluginList.map((item) => (
          <PluginInstalledCard key={item.name} item={item} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Typography.Title heading={6}>插件</Typography.Title>
      <div className="flex gap-2">
        <Input
          placeholder="搜索 npm 上的 PicGo 插件"
          value={searchText}
          onChange={handleSearchTextChange}
          allowClear
        />
        <Button onClick={goAwesomeList}>插件列表</Button>
        <Button onClick={importLocalPlugin}>导入本地插件</Button>
      </div>
      <Spin className="w-full mt-4" loading={loading}>
        {searchText ? renderSearchList() : renderPluginList()}
      </Spin>
    </>
  );
};

export default Plugin;
