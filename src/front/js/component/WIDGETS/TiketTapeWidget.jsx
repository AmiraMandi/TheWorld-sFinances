import React from "react"
import { TickerTape } from "react-ts-tradingview-widgets";


let tipos = [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "Nasdaq 100"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR/USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "BTC/USD"
    },
    {
      "proName": "BITSTAMP:ETHEUR",
      "title": "ETH/EUR"
    }
  ]

export const Widget = () => {
    return (
        <TickerTape colorTheme="dark" isTransparent="false"currencies={tipos}></TickerTape>
    )
  
};

export default Widget