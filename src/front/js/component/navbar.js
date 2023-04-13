import React, { useContext, useState } from "react";

import { Link,NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Context } from "../store/appContext";
import "../../styles/Navbar.css"

export const Navbar1 = () => {
  const [selectedCategory, setSelectedCategory] = useState('business'); // default selected category is 'general'
  const { store, actions } = useContext(Context);

  const handleCategorySelect = (category) => {
    actions.getNews(category)
  }
  const handleKeywordSelect = (keywords) => {
    actions.getNews(keywords)
  }

  const logout =()=>{
    localStorage.clear()
    actions.displayOnNews()
    actions.displayOffReadMe()
    actions.isLoginFalse()
    window.location.reload()

}
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </button>
        <div className="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link> */}
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Finance
              </Link>
              <ul className="dropdown-menu bg-light">
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('Wall Street')} to="/finance">
                    Wall Street
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('central banks')} to="/finance">
                    Central Banks
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('coin value')} to="/finance/coinvalue">
                    Coin Values
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('trade')} to="/finance">
                    Trade
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('primary goods')} to="/finance">
                    Primary Goods
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('economy calendar')} to="finance/economiccalendar">
                    Economy Calendar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('ecosustainable')} to="/finance">
                    Eco-sustainable business
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('tax', 'spend')} to="/finance">
                    Taxes and spend
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('deals')} to="/finance">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('speculation')} to="/finance">
                    Speculation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('property costs')} to="/finance">
                    Property Costs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technology
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('code wars')} to="/technology">
                    Code Wars
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('metaverse')} to="/technology">
                    Metaverse
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('robotics')} to="/technology">
                    Robotics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('AI', 'Artificial Intelligence')} to="/technology">
                    Artificial Intelligence
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                WEB3
              </Link>
              <ul className="dropdown-menu">
              <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('crypto','blockchain')} to="/web3/crypto">
                    Crypto
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('decentralized finance')} to="/web3/decentralizedfinance">
                    Decentralized Finance
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('NFT')} to="/web3/nft">
                    NFT
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('crypto', 'regulation')} to="/web3/Regulation">
                    Regulation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('crypto games')} to="/web3/cryptogames">
                    Crypto games
                  </Link>
                </li>
              </ul>
            </li>
            
          </ul>
          {store.isLogin ? (
              <button className="btn btn-darck text-white" onClick={logout}>Logout</button>)
                          :(
              <NavLink to="/login">
                  <button className="btn btn-darck text-white" >Sign In</button>
              </NavLink>
            )}
          <div>
        </div>
    
        </div>
      </div>
    </nav>
  );
};

export default Navbar1