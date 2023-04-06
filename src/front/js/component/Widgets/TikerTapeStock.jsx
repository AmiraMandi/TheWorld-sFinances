import React from "react"
import { TickerTape } from "react-ts-tradingview-widgets";

let stock = [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "US 100"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR/USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "Bitcoin"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "title": "Ethereum"
    },
    {
      "description": "Crud oil future",
      "proName": "NYMEX:CL1!"
    },
    {
      "description": "Google",
      "proName": "NASDAQ:GOOGL"
    },
    {
      "description": "TSLA",
      "proName": "NASDAQ:TSLA"
    },
    {
      "description": "NVDA",
      "proName": "NASDAQ:NVDA"
    },
    {
      "description": "META",
      "proName": "NASDAQ:META"
    },
    {
      "description": "WBN",
      "proName": "NASDAQ:WBD"
    },
    {
      "description": "AMD",
      "proName": "AMD"
    },
    {
      "description": "GOLD",
      "proName": "SPARKS:GOLDX"
    },
    {
      "description": "IBEX35",
      "proName": "TVC:IBEX35"
    },
    {
      "description": "NIKKEI 225",
      "proName": "TVC:NI225"
    }
  ]


export const TTStock = () => {
    return (
       
        <TickerTape colorTheme="dark" watermarck="false"symbols={stock} ></TickerTape>
    )
};

export default TTStock