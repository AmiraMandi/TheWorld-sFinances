import React from "react";
import brand from "../../img/brand.png"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import "../../styles/brand.css"

export const Brand =() => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="container">
          <Navbar.Brand href="/home" className="mx-auto ">
            <Link className="home link" to="/home">
            <div className="contenedor-logo">
               <img
              alt="Logo WF"
              src={brand}
            
              className="image-logo"/>
            </div>
           
            </Link>
            
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Brand  ;