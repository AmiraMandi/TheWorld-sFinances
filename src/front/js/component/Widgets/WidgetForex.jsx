import React from "react";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
let tipos = ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"];
let tipos2= ["EUR","MAD","UAH","BGN","USD","JPY","GBP","CHF","AUD","CAD","NZD","CNY","TRY","SEK","NOK","DKK","ZAR","HKD","SGD","THB","MXN","IDR","KRW","PLN","ISK","KWD","PHP","MYR","INR","TWD","SAR","AED","RUB","ILS","ARS","CLP","COP","PEN","UYU",]

export const WidgetForex = () => {
    return (
        <ForexCrossRates colorTheme="dark" width="100%" height="2000" currencies={tipos2} ></ForexCrossRates>
    )
};
export default WidgetForex;