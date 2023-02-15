import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'mobx-react';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Create a client
const queryClient = new QueryClient()
root.render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  // </React.StrictMode>
);

