import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
/* Root level CSS */
import './index.scss';

/* Markdown Store and Data */
import configureMarkdown from 'store/store-markdown';
import markdownData from 'data/data-markdown';

configureMarkdown( markdownData );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);