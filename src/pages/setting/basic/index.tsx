import { Card, Checkbox, Radio, Space, Typography } from '@arco-design/web-react';
import { useMount } from 'ahooks';
import React, { useState } from 'react';

import RadioCard from '@/components/radio-card';
import ThemeIllus from '@/components/theme-illus';

type Theme = 'light' | 'dark';

const Basic: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useMount(async () => {
    const isDarkMode = await window.darkMode.toggle();
    console.log(isDarkMode);
    setTheme(isDarkMode ? 'dark' : 'light');
  });

  return (
    <>
      <Card title="偏好设置" bordered={false}>
        <Checkbox>
          <Typography.Text bold>开机自动启动</Typography.Text>
        </Checkbox>
      </Card>
      <Card title="设置主题" bordered={false}>
        <Space direction="vertical" size="medium">
          <Checkbox>
            <Space direction="vertical" size="mini">
              <Typography.Text bold>跟随系统</Typography.Text>
              <Typography.Text type="secondary">
                选择后，将根据系统打开或关闭深色模式
              </Typography.Text>
            </Space>
          </Checkbox>
          <Radio.Group value={theme} onChange={setTheme}>
            <RadioCard label="浅色" value="light">
              <ThemeIllus.LightTheme />
            </RadioCard>
            <RadioCard label="深色" value="dark">
              <ThemeIllus.DarkTheme />
            </RadioCard>
          </Radio.Group>
        </Space>
      </Card>
    </>
  );
};

export default Basic;
