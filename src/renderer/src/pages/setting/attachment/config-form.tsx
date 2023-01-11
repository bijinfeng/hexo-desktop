import {
  Checkbox,
  Form,
  Grid,
  Input,
  Message,
  Modal,
  Select,
  Switch,
} from '@arco-design/web-react';
import { get, isString } from 'lodash-es';
import React, { useEffect, useState } from 'react';

import { AppEventManager, EventType } from '@/event';
import { usePicgoStore } from '@/models/picgo';

export interface FormRef {
  show: () => void;
}

const ConfigForm: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [bed, setBed] = useState<PICGO.IPicBedType>();
  const [config, setConfig] = useState<PICGO.IPicGoPluginConfig[]>([]);
  const { getPicBedConfig, savePicBedConfig } = usePicgoStore();

  useEffect(() => {
    const show = (bed: PICGO.IPicBedType) => {
      setBed(bed);
      getPicBedConfig(bed.type).then((res) => {
        setConfig(res.config);
        form.setFieldsValue(res.data);
        setVisible(true);
      });
    };
    AppEventManager.addListener(EventType.OPEN_BED_CONFIG_MODAL, show);
    return () => {
      AppEventManager.removeListener(EventType.OPEN_BED_CONFIG_MODAL, show);
    };
  }, []);

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
    <Modal
      title={<div className="text-left">{bed?.name}</div>}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={handleOk}
      afterClose={() => form.clearFields()}
    >
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
      </Form>
    </Modal>
  );
};

ConfigForm.displayName = 'ConfigForm';

export default ConfigForm;
