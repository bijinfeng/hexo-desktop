import { Layout } from '@arco-design/web-react';
import React from 'react';

import { useUpdater } from '@/hooks';

import styles from './style.module.less';

const Footer: React.FC = () => {
  const { version } = useUpdater();

  return <Layout.Footer className={styles.footer}>version: {version}</Layout.Footer>;
};

export default Footer;
