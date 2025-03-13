import { createContext } from 'react';
import React from 'react';
import { fakeFetchAssets, fakeFetchCrypto } from '../api';
import { percentDif } from '../utils';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [crypto, setCrypto] = React.useState([]);
  const [assets, setAssets] = React.useState([]);

  React.useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fakeFetchAssets();

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPorcent: percentDif(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContext;
