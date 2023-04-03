import React from "react"
import { TickerTape } from "react-ts-tradingview-widgets";

 let crypto = [
    {
      "proName": "BINANCE:ETHUSDT",
      "title": "ETH/USDT"
    },
    {
      "proName": "BINANCE:BTCUSDT",
      "title": "BTC/USDT"
    },
    {
      "proName": "BINANCE:SOLUSDT",
      "title": "SOL/USDT"
    },
    {
      "proName": "BINANCE:BNBUSDT",
      "title": "BNB/UST"
    },
    {
      "proName": "BINANCE:XRPUSDT",
      "title": "XRP/USD"
    },
    {
      "proName": "BINANCE:ADAUSDT",
      "title": "ADA/USDT"
    },
    {
      "proName": "BINANCE:DOGEUSDT",
      "title": "DOGE/USDT"
    },
    {
      "proName": "KUCOIN:DOTUSDT",
      "title": "DOT/USDT"
    },
    {
      "proName": "BITFINEX:LTCUST.P",
      "title": "LTC/USDT"
    },
    {
      "proName": "BINANCE:SHIBUSDT",
      "title": "SHIBA/USDT"
    },
    {
      "proName": "BINANCE:AVAXUSDT",
      "title": "AVAX/USDT"
    }
  ]
  

export const Widget = () => {
    return (
        <TickerTape colorTheme="dark" isTransparent="false"symbols={crypto}></TickerTape>
    )
};

export default Widget