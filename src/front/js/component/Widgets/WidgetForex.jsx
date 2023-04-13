import React from "react";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
let tipos = ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"];
let tipos2= ["EUR","USD","JPY","UYU","GBP","CHF","AUD","CAD","NZD","CNY","TRY","SEK","NOK","DKK","ZAR","HKD","SGD","THB","MXN","IDR","KRW","PLN","ISK","KWD","PHP","MYR","INR","TWD","SAR","AED","RUB","ILS","ARS","CLP","COP","PEN","UYU","BHD","MAD","UAH","BGN"]

export const WidgetForex = () => {
    return (
        <div className="container-fluid">
            <br />
            <h1 className="d-flex justify-content-center">Coin Values</h1>
            <br />
          <ForexCrossRates colorTheme="light" width="100%" height="1000" currencies={tipos2} ></ForexCrossRates>  
        </div>
        
    )
};
export default WidgetForex;