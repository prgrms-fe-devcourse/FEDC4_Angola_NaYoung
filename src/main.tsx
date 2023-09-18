import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { commonStyles } from '@styles/commonStyles';
import { resetStyles } from '@styles/resetStyles.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={{ ...resetStyles, ...commonStyles }} />,
    <App />
  </React.StrictMode>,
);
