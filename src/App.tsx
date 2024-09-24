import { useEffect } from "react";
import { CriptoSearchForm, CryptoPriceDisplay } from "./components";
import { useCryptoStore } from "./store";

export const App = () => {

   const { fetchCrytos } = useCryptoStore();

   useEffect(() => {
      fetchCrytos();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   

  return (
    <>
      <div className="container">
         <h1 className="app-title">Cotizador de 
            <span>criptomonedas</span>
         </h1>

         <div className="content">
            <CriptoSearchForm />
            <CryptoPriceDisplay />
         </div>
      </div>
    </>
  )
}
