import React from 'react';

import Card from '../card';
import BedList from './bed-list';
import ConfigForm from './config-form';
import Plugin from './plugin';

const Attachment: React.FC = () => {
  return (
    <Card title="附件设置">
      <BedList />
      <Plugin />
      <ConfigForm />
    </Card>
  );
};

export default Attachment;
