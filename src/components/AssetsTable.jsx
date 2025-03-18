import React from 'react';
import { Table } from 'antd';
import CryptoContext from '../context/crypto-context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

function AssetsTable() {
  const { assets } = React.useContext(CryptoContext);

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  );
}

export default AssetsTable;
