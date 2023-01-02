import { Button, Form, Grid, Input, Select } from '@arco-design/web-react';
import React from 'react';

import Card from '../card';

interface ProxyState {
  type: 'none' | 'http' | 'scoks';
  host?: string;
  port?: string;
  username?: string;
  password?: string;
}

const defaultProxyState: ProxyState = {
  type: 'none',
  host: '',
  port: '',
  username: '',
  password: '',
};

const Proxy: React.FC = () => {
  const [form] = Form.useForm<ProxyState>();
  const type = Form.useWatch('type', form as any);
  const disabled = type === 'none';

  const handleSubmit = (v: ProxyState) => {
    console.log(v);
  };

  const handleChange = (v: Partial<ProxyState>) => {
    if (v?.type === 'none') {
      form.setFieldsValue(defaultProxyState);
    }
  };

  return (
    <Card title="代理设置">
      <Form<ProxyState>
        labelAlign="left"
        initialValues={defaultProxyState}
        form={form}
        onSubmit={handleSubmit}
        onChange={handleChange}
        layout="vertical"
        disabled={disabled}
      >
        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <Form.Item disabled={false} label="类型" field="type">
              <Select>
                <Select.Option value="none">不使用代理</Select.Option>
                <Select.Option value="http">HTTP代理</Select.Option>
                <Select.Option value="scoks">SOCKS代理</Select.Option>
              </Select>
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <Form.Item label="地址" field="host" rules={[{ required: !disabled }]}>
              <Input />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label="端口" field="port" rules={[{ required: !disabled }]}>
              <Input />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label="用户名" field="username">
              <Input />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label="密码" field="password">
              <Input />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Form.Item disabled={false}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Proxy;
