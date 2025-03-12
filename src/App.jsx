import React, { useEffect } from 'react';
import { Layout } from 'antd';

import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import AppContent from './components/AppContent';

const App = () => {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default App;
