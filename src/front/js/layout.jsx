import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { NewsCards } from "./component/NewsCards.jsx"
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar1 } from "./component/navbar";
import { Footer } from "./component/footer";
import { Widget } from "./component/Widgets/TickerTapeCrypto.jsx";
import { EconomyCalendarWidget } from "./component/Widgets/CalendarWidget.jsx"
import { CryptoWidget } from "./component/Widgets/CryptoWidget.jsx"
import { WidgetForex } from "./component/Widgets/WidgetForex.jsx"
import { StockMarketWidget } from "./component/Widgets/StockMarket.jsx"
import { TTStock } from "./component/Widgets/TikerTapeStock.jsx"
import { Login } from "./component/login.jsx";
import { Brand } from "./component/brand.jsx";





//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>

      <BrowserRouter basename={basename}>
        <ScrollToTop>
        <Brand  />
        <Navbar1 />
          {/* <NewsCards /> */}
          <Widget/>
          <TTStock/>
          {/* <CryptoWidget/>
          <StockMarketWidget/> */}
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Login />} path="/login" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<WidgetForex />} path="coinvalue"/>
            <Route element={<EconomyCalendarWidget />} path="finance/economiccalendar"/>
            <Route element={<WidgetForex />} path="finance/coinvalue"/>
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
