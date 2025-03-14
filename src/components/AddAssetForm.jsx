import React from 'react';
import {
  Select,
  Space,
  Flex,
  Typography,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
} from 'antd';
import CryptoContext from '../context/crypto-context';

function AddAssetForm() {
  const [coin, setCoin] = React.useState(null);
  const { crypto } = React.useContext(CryptoContext);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {coin === null ? (
        <Select
          style={{ width: '100%' }}
          onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
          placeholder="Select Coin"
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
      ) : (
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 10,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Flex align="center">
            <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 15 }} />
            <Typography.Title style={{ margin: 0 }} level={2}>
              {coin.symbol} {coin.name}
            </Typography.Title>
          </Flex>
          <Divider />

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
                message: 'Please input your username!',
              },
            ]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber disabled style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Date & Hour" name="Date & Hour">
            <DatePicker showTime />
          </Form.Item>

          <Form.Item label="Total" name="total">
            <InputNumber disabled style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Add Asset!
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default AddAssetForm;
