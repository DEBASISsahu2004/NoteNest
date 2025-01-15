import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const clientId = '570337548504-or262f6di747su1qc52730h2ukr1bvfb.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
);