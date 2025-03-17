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
  Result,
} from 'antd';
import CryptoContext from '../context/crypto-context';

const validateMessages = {
  required: '${label} is rqeuired!',
  types: {
    number: '${label} is not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const [coin, setCoin] = React.useState(null);
  const { crypto, addAsset } = React.useContext(CryptoContext);
  const [submitted, setSubmitted] = React.useState(false);
  const assetRef = React.useRef();

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleAmountChange = (value) => {
    if (!value || isNaN(value)) {
      form.setFieldsValue({ total: 0 });
      return;
    }

    const total = (value * (coin?.price || 0)).toFixed(2);

    form.setFieldsValue({
      total: Number(total),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go Console
          </Button>,
        ]}
      />
    );
  }

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
          form={form}
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
            price: +coin.price.toFixed(4),
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
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
              },
            ]}>
            <InputNumber
              placeholder="Enter coin amount"
              onChange={handleAmountChange}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
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
