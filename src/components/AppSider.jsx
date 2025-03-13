import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';
import { capitalize } from '../utils';
import CryptoContext from '../context/crypto-context';

const siderStyle = {
  padding: '1rem',
};

function AppSider() {
  const { assets } = React.useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? '#3f8600' : '#cf1322',
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, isTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              //{ title: 'Difference', value: asset.growPorcent },
            ]}
            renderItem={(item) => (
              <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title}</span>
                <span>
                  {item.isTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPorcent}%</Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
