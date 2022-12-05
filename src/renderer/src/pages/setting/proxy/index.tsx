import { Button, Form, Input, Select, Typography } from '@arco-design/web-react';
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
  const isEmpty = type === 'none';

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
        style={{ width: 400 }}
        labelCol={{ span: 4 }}
        initialValues={defaultProxyState}
        form={form}
        colon={true}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <Form.Item label={<Typography.Text>类型</Typography.Text>} field="type">
          <Select>
            <Select.Option value="none">不使用代理</Select.Option>
            <Select.Option value="http">HTTP代理</Select.Option>
            <Select.Option value="scoks">SOCKS代理</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<Typography.Text>地址</Typography.Text>}
          field="host"
          disabled={isEmpty}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<Typography.Text>端口</Typography.Text>}
          field="port"
          disabled={isEmpty}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<Typography.Text>用户名</Typography.Text>}
          field="username"
          disabled={isEmpty}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<Typography.Text>密码</Typography.Text>}
          field="password"
          disabled={isEmpty}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Proxy;
