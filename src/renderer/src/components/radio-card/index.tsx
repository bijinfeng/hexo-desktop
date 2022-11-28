import { Card, Radio, Typography } from '@arco-design/web-react';
import React from 'react';

interface RadioCardProps {
  children: React.ReactNode;
  label: string;
  value: string;
}

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { children, label, value } = props;
  return (
    <Radio value={value}>
      {({ checked }) => (
        <Card hoverable cover={children}>
          <Radio checked={checked}>
            <Typography.Text bold>{label}</Typography.Text>
          </Radio>
        </Card>
      )}
    </Radio>
  );
};

export default RadioCard;
