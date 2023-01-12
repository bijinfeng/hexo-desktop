import {
  Button,
  Card,
  Empty,
  Image,
  Input,
  Spin,
  Tag,
  Typography,
} from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { isEmpty } from 'lodash-es';
import React, { useState } from 'react';

import defaultLogo from '@/assets/roundLogo.png';
import { confirm } from '@/components/confirm';
import { openUrl } from '@/utils/open-url';

import { getSearchResult, handleSearchResult } from './service';
import { installPlugin } from './utils';

const goAwesomeList = () => openUrl('https://github.com/PicGo/Awesome-PicGo');

interface PluginCardProps {
  item: ReturnType<typeof handleSearchResult>;
}

// 待安装插件 card
const PluginCard: React.FC<PluginCardProps> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleInstall = async () => {
    setLoading(true);
    const res = await installPlugin(item.fullName);
    setLoading(false);
    console.log(res);
  };

  const handleInstallPlugin = (item: PluginCardProps['item']) => {
    if (loading) return;

    if (!item.gui) {
      confirm({
        title: '注意',
        content: '该插件未对可视化界面进行优化, 是否继续安装?',
        onOk: handleInstall,
      });
    } else {
      handleInstall();
    }
  };

  return (
    <Card
      size="small"
      bodyStyle={{ display: 'flex', position: 'relative', overflow: 'hidden' }}
    >
      <Image
        width={64}
        height={64}
        src={item.logo}
        error={<img src={defaultLogo} alt="default-logo" />}
      />
      <div className="flex flex-col justify-between flex-1 overflow-hidden ml-2 text-text-1">
        <div
          className="flex items-center hover:text-primary-6 cursor-pointer"
          onClick={() => openUrl(item.homepage)}
          title={item.name}
        >
          <span className="truncate font-medium leading-5">{item.name}</span>
          <small className="ml-2">{item.version}</small>
        </div>
        <div className="text-xs truncate" title={item.description}>
          {item.description}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">{item.author}</span>
          <Tag
            size="small"
            className="cursor-pointer"
            onClick={() => handleInstallPlugin(item)}
          >
            <div className="flex items-center gap-1">
              {loading && <IconLoading />}
              安装
            </div>
          </Tag>
        </div>
      </div>

      {!item.gui && (
        <div className="absolute right-0 top-0 bg-primary-6 inline-flex w-[50px] justify-center items-center text-[11px] leading-tight translate-x-3.5 translate-y-1 rotate-45">
          CLI
        </div>
      )}
    </Card>
  );
};

const Plugin: React.FC = () => {
  const [searchText, setSearchText] = useState<string>();
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
          <PluginCard key={item.name} item={item} />
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
        <Button>导入本地插件</Button>
      </div>
      {searchText && (
        <Spin className="w-full mt-4" loading={loading}>
          {renderSearchList()}
        </Spin>
      )}
    </>
  );
};

export default Plugin;
