import { Checkbox, Radio, Space, Typography } from '@arco-design/web-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import RadioCard from '@/components/radio-card';
import ThemeIllus from '@/components/theme-illus';
import { lngMaps } from '@/i18n';
import { useConfigStore } from '@/models/config';
import { useThemeStore } from '@/models/theme';

import Card from '../card';

const Basic: React.FC = () => {
  const { i18n } = useTranslation();
  const { system, theme, updateTheme } = useThemeStore();
  const { config, update } = useConfigStore();

  const systemThemeChange = (bol: boolean) => {
    updateTheme(bol ? 'system' : theme);
  };

  const handleCheck = (checked: boolean) => {
    update({ openAtLogin: checked });
  };

  const handleLangChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    update({ lang: newLang });
  };

  return (
    <Card title="基本设置">
      <div>
        <Typography.Title heading={6}>启动设置</Typography.Title>
        <Checkbox checked={config.openAtLogin} onChange={handleCheck}>
          <Typography.Text bold>开机自动启动</Typography.Text>
        </Checkbox>
      </div>
      <div>
        <Typography.Title heading={6}>语言</Typography.Title>
        <Radio.Group value={config.lang} onChange={handleLangChange}>
          {Object.keys(lngMaps).map((key) => (
            <Radio key={key} value={key}>
              {lngMaps[key].label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <div>
        <Typography.Title heading={6}>主题设置</Typography.Title>
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
      </div>
    </Card>
  );
};

export default Basic;
