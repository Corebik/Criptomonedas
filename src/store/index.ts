import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Cryptocurrency, Pair, CryptoPrice } from '../types';

import { fetchCurrencyCrytoPrice, getCryptos } from '../services/CryptoService';

type CryptoStore = {
   cryptocurrencies: Cryptocurrency[];
   result: CryptoPrice;
   loading: boolean;
   fetchCrytos: () => Promise<void>;
   fetchData: ( pair : Pair ) => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
      cryptocurrencies: [],
      result: {
         IMAGEURL: "",
         PRICE: "",
         HIGHDAY: "",
         LOWDAY: "",
         CHANGEPCT24HOUR: "",
         LASTUPDATE: ""
      },
      loading: false,
      fetchCrytos: async() => {
         const cryptocurrencies =  await getCryptos();
         set(() => ({ cryptocurrencies }));
      },
      fetchData: async(pair) => {
         set(() => ({ loading: true }));
         const result = await fetchCurrencyCrytoPrice(pair);
         set(() => ({result, loading: false }));
      }
   })))