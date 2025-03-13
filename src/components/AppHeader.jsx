import React from 'react';
import { Layout, Select, Space, Button } from 'antd';
import CryptoContext from '../context/crypto-context';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function AppHeader() {
  const handleSelect = () => {};
  const { crypto } = React.useContext(CryptoContext);
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        onSelect={handleSelect}
        value="Press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{
                width: 20,
              }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add asset</Button>
    </Layout.Header>
  );
}

export default AppHeader;
