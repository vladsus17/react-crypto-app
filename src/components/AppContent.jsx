import React from 'react';
import { Layout, Typography } from 'antd';
import CryptoContext from '../context/crypto-context';
import PortfolioChart from './PortfolioChart';
import AssetsTable from './AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: '100vh',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

function AppContent() {
  const { crypto, assets } = React.useContext(CryptoContext);
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, value) => (acc += value), 0)
          .toFixed(2)}{' '}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}

export default AppContent;
