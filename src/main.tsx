import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <PrimeReactProvider value={{unstyled: false}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </StrictMode>
  </Provider>
);
