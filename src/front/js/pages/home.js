import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card, Button } from 'react-bootstrap';
import {TTStock} from '../component/Widgets/TikerTapeStock.jsx'
import "../../styles/home.css";
import { NewsCards } from "../component/NewsCards.jsx"

export const Home = () => {
  
  return (
    <div>
      <TTStock/>
      {/* <NewsCards /> */}
    </div>
  );
};

export default Home