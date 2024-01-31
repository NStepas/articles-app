import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

import App from './App';
import { apiSlice } from './slices/apiSlice';
import { DataProvider } from './DataContext';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={apiSlice}>
        <DataProvider>
          <App />
        </DataProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
