import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  // eslint-disable-next-line react/jsx-no-undef
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
