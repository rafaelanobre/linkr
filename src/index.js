import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import ResetStyle from './style/ResetStyle';
import GlobalStyle from './style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);