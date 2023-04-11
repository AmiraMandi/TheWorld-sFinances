import React from "react";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
export const CryptoWidget = () => {
    return (
        <div className="container">
             <CryptoCurrencyMarket colorTheme="dark" width="100%" height="400"></CryptoCurrencyMarket>
        </div>
       
    )
}
export default CryptoWidget