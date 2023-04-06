import React from "react";
import brand from "../../img/brand.png"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


export const Brand =() => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home" className="mx-auto">
            <Link className="home link" to="/home">
            <img
              alt="Logo WF"
              src={brand}
              width={"400"} height={"100"}
              className="d-inline-block align-top "/>
            </Link>
            
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Brand  ;