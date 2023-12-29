import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

import TokenSelector from './Components/TokenSelector';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    <TokenSelector />
  </React.StrictMode>,
);
