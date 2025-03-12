import React from 'react';
import { Layout } from 'antd';

const contentStyle = {
  textAlign: 'center',
  minHeight: '100vh',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}

export default AppContent;
