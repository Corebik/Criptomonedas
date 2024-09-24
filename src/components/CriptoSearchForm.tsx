import { useState, ChangeEvent, FormEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";

import type { Pair } from "../types";
import { ErrorMessage } from "./ErrorMessage";

const PairState = {
   currency: "",
   criptocurrency: ""
}

export const CriptoSearchForm = () => {

   const { cryptocurrencies, fetchData } = useCryptoStore();
   const [pair, setPair] = useState<Pair>(PairState);
   const [error, setError] = useState("");

   const onSelectChange = ( event : ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setPair({ ...pair, [name]: value });
   }

   const onSubmit = ( event : FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(Object.values(pair).includes('')){
         setError('Todos los campos son obligatorios');
      }

      setError("");
      fetchData( pair );
      //Consultar la API
   }

  return (
    <form className="form" onSubmit={ onSubmit }>
      { error && <ErrorMessage>{ error }</ErrorMessage> }
      <div className="field">

         <label htmlFor="currency">Moneda:</label>
         <select 
            name="currency" 
            id="currency" 
            value={ pair.currency  }
            onChange={ onSelectChange }
         >
            <option value="">-- Seleccione --</option>
            { currencies.map(currency => (
               <option 
                  key={currency.code} 
                  value={currency.code}
               >
                     {currency.name}
               </option>
            ))}
         </select>
      </div>

      <div className="field">
         <label htmlFor="criptocurrency">Moneda:</label>
         <select 
            name="criptocurrency" 
            id="criptocurrency" 
            value={ pair.criptocurrency }
            onChange={ onSelectChange }
         >
            <option value="">-- Seleccione --</option>
            { cryptocurrencies.map( crypto => (
               <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                     {crypto.CoinInfo.FullName}
               </option>
            ))}
         </select>
      </div>

      <input type="submit" value="Cotizar" />

    </form>
  )
}
