import React from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import CryptoContext from '../context/crypto-context';
import CoinInfoModal from './CoinInfoModal';
import AddAssetForm from './AddAssetForm';

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
  const [select, setSelect] = React.useState(false);
  const [coin, setCoin] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { crypto } = React.useContext(CryptoContext);
  const [drawer, setDrawer] = React.useState(false);

  React.useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => {
      document.removeEventListener('keypress', keypress);
    };
  }, []);

  const handleSelect = (vale) => {
    setIsModalOpen(true);
    setCoin(crypto.find((c) => c.id === vale));
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="Press / to open"
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
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose>
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
