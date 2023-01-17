// import './utils/sentry';
import '@/commands';
import '@/assets/styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { initI18next } from '@/i18n';

import App from './App';

const init = async () => {
  await initI18next();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  );
};

init();
