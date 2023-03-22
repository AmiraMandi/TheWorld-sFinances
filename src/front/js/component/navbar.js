import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Finance
              </a>
              <ul className="dropdown-menu bg-light">
                <li>
                  <a className="dropdown-item" href="#">
                    Wall Street
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Central Banks
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Coin Values
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Trade
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Primary Goods
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Economy Calendar
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Eco-sustainable business
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Taxes and spend
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Deals
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Speculation
                  </a>
                </li>
				<li>
                  <a className="dropdown-item" href="#">
                    Property Costs
                  </a>
                </li>
              </ul>
            </li>
			<li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technology
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Code Wars
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Metaverse
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Robotics
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Artificial Intelligence
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Crypto
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Decentralized Finance
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    NFT
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Regulation
                  </a>
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
