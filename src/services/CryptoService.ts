import axios from 'axios';
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from '../schemas/cryto-schema';
import { Pair } from '../types';

const getCryptos = async () => {

   try{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const {data : { Data }} = await axios.get(url);
      const result = CryptoCurrenciesResponseSchema.safeParse(Data);
      
      if(result.success) {
         return result.data;
      }
   }catch(error){
      console.log(error);
   }
}

const fetchCurrencyCrytoPrice = async( pair : Pair ) => {
   const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
   try{
      const {data : { DISPLAY }} = await axios.get(url);
      
      const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency]);
      if(result.success){
         return result.data;
      }
   }catch(error){
      console.log(error);
   }
}

export { getCryptos, fetchCurrencyCrytoPrice };
