import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { resetStyles } from '@styles/resetStyles.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={resetStyles} />
    <App />
  </React.StrictMode>,
);
