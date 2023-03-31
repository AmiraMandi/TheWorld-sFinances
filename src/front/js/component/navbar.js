import React, {useContext, useState} from "react";

import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState('general'); // default selected category is 'general'
  const { store, actions } = useContext(Context);

  const handleCategorySelect = (category) => {
    actions.getNews(category)
  }
  const handleKeywordSelect = (keywords) => {
    actions.getNews(keywords)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
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
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('coin value')} to="/finance">
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
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('economy calendar')} to="/finance">
                    Economy Calendar
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('ecosustainable')} to="/finance">
                    Eco-sustainable business
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('tax','spend')} to="/finance">
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
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('AI','Artificial Intelligence')} to="/technology">
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
                Crypto
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('decentralized finance')} to="/crypto">
                    Decentralized Finance
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('NFT')} to="/crypto">
                    NFT
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={() => handleKeywordSelect('crypto', 'regulation')} to="/crypto">
                    Regulation
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-danger" type="submit">
              {store.isLogin ? "logout" : "login"}
              
            </button>
        </div>
      </div>
    </nav>
  );
};
