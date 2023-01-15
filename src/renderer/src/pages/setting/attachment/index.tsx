import React from 'react';

import Card from '../card';
import BedList from './bed-list';
import Plugin from './plugin';

const Attachment: React.FC = () => (
  <Card title="附件设置">
    <Plugin />
    <BedList />
  </Card>
);

export default Attachment;
