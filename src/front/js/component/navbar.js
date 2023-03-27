import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

  const { store, actions } = useContext(Context);
  
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
                  <Link className="dropdown-item" to="#">
                    Wall Street
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Central Banks
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Coin Values
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Trade
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Primary Goods
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Economy Calendar
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Eco-sustainable business
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Taxes and spend
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Deals
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
                    Speculation
                  </Link>
                </li>
				<li>
                  <Link className="dropdown-item" to="#">
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
                  <Link className="dropdown-item" to="#">
                    Code Wars
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Metaverse
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Robotics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
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
                  <Link className="dropdown-item" to="#">
                    Decentralized Finance
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    NFT
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Regulation
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-danger" type="submit">
              Login
            </button>
        </div>
      </div>
    </nav>
  );
};
