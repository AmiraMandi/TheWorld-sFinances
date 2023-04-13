import React,{useContext} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { NewsCards } from "./component/NewsCards.jsx"
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { TermsandConditions} from "./pages/TermsandConditions.js";
import injectContext from "./store/appContext";
import { Context } from "./store/appContext"; 
import { Navbar1 } from "./component/navbar";
import { Footer } from "./component/footer";
import { Widget } from "./component/Widgets/TickerTapeCrypto.jsx";
import { EconomyCalendarWidget } from "./component/Widgets/CalendarWidget.jsx"
import { CryptoWidget } from "./component/Widgets/CryptoWidget.jsx"
import { WidgetForex } from "./component/Widgets/WidgetForex.jsx"
import { StockMarketWidget } from "./component/Widgets/StockMarket.jsx"
import { TTStock } from "./component/Widgets/TikerTapeStock.jsx"
import { Login } from "./component/login.jsx";
import { RecuperacionPassword } from "./component/recuperacionpassword.jsx";
import { Registro } from "./component/registro.jsx";
import { Advertisers} from "./pages/Advertiser.jsx"
import { Brand } from "./component/brand.jsx";
import '../styles/footer.css'
import {DecentralizedFinances} from "./pages/Decentralized Finance.jsx"
import { Crypto } from "./pages/cryptoview.jsx";
import {Suggestion} from './pages/suggestionbox.jsx'
import { Root } from "./pages/root.js";
//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="layout">

      <BrowserRouter basename={basename}>
        <ScrollToTop>
        <Brand  />
        <Navbar1 />
          <Routes>
            <Route element={<Root />} path="/" />
            <Route element={<Home />} path="/home" />
            <Route element={<Login />} path="/login" />
            <Route element={<RecuperacionPassword />} path="/passwordRecovery" />
            <Route element={<Registro />} path="/registration" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<WidgetForex />} path="/finance/coinvalue" />
            <Route element={<EconomyCalendarWidget />} path="finance/economiccalendar" />
            <Route element={<WidgetForex />} path="finance/coinvalue" />
            <Route element={<DecentralizedFinances/>} path="web3/decentralizedfinance"/>
            <Route element={<Crypto/>} path="web3/crypto" />
            <Route element={<TermsandConditions />}  path="termsandconditions"/>
            <Route element={<Advertisers/>} path="adversitisers" />
            <Route element={<Suggestion/>} path='suggestionbox'/>
            <Route element={<h1>Not found!</h1>} />
            <Route element={<h1>Not found!</h1>} /><Route element={<h1>Not found!</h1>} />
          </Routes>
          {store.displayNews ? <NewsCards/> : null}
           {/* <NewsCards/> */}
        </ScrollToTop>
      </BrowserRouter>
       <Footer />
    </div>
  );
};

export default injectContext(Layout);
