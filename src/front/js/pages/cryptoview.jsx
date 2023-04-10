import React from "react";

import {Widget} from '../component/Widgets/TickerTapeCrypto.jsx'
import {CryptoWidget} from '../component/Widgets/CryptoWidget.jsx'

export const Crypto = () => {
  
  return (
    <div>
      <Widget/>
      
      <CryptoWidget/>
    </div>
  );
};

export default Crypto