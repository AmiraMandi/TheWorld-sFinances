import React from "react";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
 let tipos = ["EUR", "USD", "JPY", "GBP"]
  

export const WidgetForex = () => {
    return (
        <ForexCrossRates colorTheme="dark" autosize currencies={tipos} ></ForexCrossRates>

    )
  
};

export default WidgetForex