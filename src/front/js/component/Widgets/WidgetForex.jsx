import React from "react";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
let tipos = ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"];
export const WidgetForex = () => {
    return (
        <ForexCrossRates colorTheme="dark" width="800" height="200" currencies={tipos} ></ForexCrossRates>
    )
};
export default WidgetForex;