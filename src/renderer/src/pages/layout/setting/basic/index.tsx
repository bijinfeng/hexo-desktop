import { Checkbox, Radio, Space, Typography } from '@arco-design/web-react';
import React from 'react';

import RadioCard from '@/components/radio-card';
import ThemeIllus from '@/components/theme-illus';
import { useConfigStore } from '@/models/config';
import { useThemeStore } from '@/models/theme';

import Card from '../card';

const Basic: React.FC = () => {
  const { system, theme, updateTheme } = useThemeStore();
  const { config, update } = useConfigStore();

  const systemThemeChange = (bol: boolean) => {
    updateTheme(bol ? 'system' : theme);
  };

  const handleCheck = (checked: boolean) => {
    update({ openAtLogin: checked });
  };

  return (
    <>
      <Card title="偏好设置" bordered={false}>
        <Checkbox checked={config.openAtLogin} onChange={handleCheck}>
          <Typography.Text bold>开机自动启动</Typography.Text>
        </Checkbox>
      </Card>
      <Card title="设置主题" bordered={false}>
        <Space direction="vertical" size="medium">
          <Checkbox checked={system} onChange={systemThemeChange}>
            <Space direction="vertical" size="mini">
              <Typography.Text bold>跟随系统</Typography.Text>
              <Typography.Text type="secondary">
                选择后，将根据系统打开或关闭深色模式
              </Typography.Text>
            </Space>
          </Checkbox>
          <Radio.Group value={theme} onChange={updateTheme} disabled={system}>
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
