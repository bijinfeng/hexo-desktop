import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  Message,
  Select,
  Switch,
} from '@arco-design/web-react';
import { get, isString } from 'lodash-es';
import React, { useEffect, useState } from 'react';

import { usePicgoStore } from '@/models/picgo';

interface ConfigFormProps {
  bed: PICGO.IPicBedType;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ bed }) => {
  const [form] = Form.useForm();
  const [config, setConfig] = useState<PICGO.IPicGoPluginConfig[]>([]);
  const { defaultPicBed, getPicBedConfig, savePicBedConfig, setDefaultPicBed } =
    usePicgoStore();

  useEffect(() => {
    getPicBedConfig(bed.type).then((res) => {
      setConfig(res.config);
      form.setFieldsValue(res.data);
    });
  }, [bed]);

  const getChoiceKey = (choice: PICGO.Choice, key: 'name' | 'value') => {
    return isString(choice) ? choice : get(choice, key);
  };

  const handleOk = () => {
    form.validate((errors, values) => {
      if (!errors && bed) {
        savePicBedConfig(bed.type, values);
        Message.success('保存成功');
      }
    });
  };

  const handleSetDefaultPicBed = () => {
    setDefaultPicBed(bed.type);
    Message.success('设置成功');
  };

  const renderContent = (item: PICGO.IPicGoPluginConfig) => {
    let component: React.ReactNode = null;

    switch (item.type) {
      case 'input':
        component = <Input placeholder={item.message} />;
        break;

      case 'password':
        component = <Input.Password placeholder={item.message} />;
        break;

      case 'list':
        component = (
          <Select placeholder={item.message}>
            {item.choices?.map((choice, index) => (
              <Select.Option key={index} value={getChoiceKey(choice, 'value')}>
                {getChoiceKey(choice, 'name')}
              </Select.Option>
            ))}
          </Select>
        );
        break;

      case 'checkbox':
        component = (
          <Checkbox.Group>
            {item.choices?.map((choice, index) => (
              <Checkbox key={index} value={getChoiceKey(choice, 'value')}>
                {getChoiceKey(choice, 'name')}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
        break;

      case 'confirm':
        component = <Switch checkedText="yes" uncheckedText="no" />;
        break;

      default:
        break;
    }

    return component;
  };

  return (
    <Form form={form} layout="vertical">
      <Grid.Row gutter={24}>
        {config.map((item, index) => (
          <Grid.Col key={index} span={12}>
            <Form.Item
              field={item.name}
              label={item.alias || item.name}
              rules={[{ required: !!item.required }]}
            >
              {renderContent(item)}
            </Form.Item>
          </Grid.Col>
        ))}
      </Grid.Row>
      <div>
        <Button type="primary" className="mr-4" onClick={handleOk}>
          提交
        </Button>
        <Button disabled={bed.type === defaultPicBed} onClick={handleSetDefaultPicBed}>
          设为默认图床
        </Button>
      </div>
    </Form>
  );
};

ConfigForm.displayName = 'ConfigForm';

export default ConfigForm;
