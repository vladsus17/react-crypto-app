import React from 'react';
import AppLoyout from './components/AppLoyaut';
import { CryptoContextProvider } from './context/crypto-context';

const App = () => {
  return (
    <CryptoContextProvider>
      <AppLoyout />
    </CryptoContextProvider>
  );
};

export default App;
