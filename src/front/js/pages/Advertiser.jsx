
import React, { useState, useContext, useEffect, useSyncExternalStore } from "react";
import {Form, Button, FormGroup, FormLabel} from 'react-bootstrap';
import { Context } from "../store/appContext";

export const Advertisers =() => {
  const { store, actions } = useContext(Context);

  useEffect(()=>{
    actions.displayOffNews();
    
   },[])

  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [company_address, setCompany_address] = useState("");
  const [CIF_NIF, setCIFNIF] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

        const ADV  = async (name, last_name, email, company , company_address , CIF_NIF ) => {
          const options = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name:name,
                  last_name:last_name,
                  email: email,
                  company: company,
                  company_address:company_address,
                  CIF_NIF:CIF_NIF
              }),
          };
          try {
              const resp = await fetch(
                  process.env.BACKEND_URL + "/api/suggestions",
                  options
              );
              if (resp.status === 200) {
                  alert('petition OK')
              }
          } catch (error) {
            alert('Error on the petition')
          }
          
      }
      ADV(fullName,email,suggestion)
  }

  return ( 
    <div className='container'>
       <Form>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <Form.Control type="text" placeholder="Juan" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Last Name</FormLabel>
          <Form.Control type="text" placeholder="Rodriguez" />
        </FormGroup>
      <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
        <FormGroup>
          <FormLabel>Company</FormLabel>
          <Form.Control type="text" placeholder="Tesla" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Company address</FormLabel>
          <Form.Control type="text" placeholder="Calle Verdadera o no 123" />
        </FormGroup>
        <FormGroup>
          <FormLabel>CIF / NIF </FormLabel>
          <Form.Control type="text" placeholder="XXXXXXXXX" />
        </FormGroup>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>What do you want to offer us?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant='info' type='submit' className='mx-auto'>submit</Button>
    </Form>
    </div>
  );
}

export default Advertisers