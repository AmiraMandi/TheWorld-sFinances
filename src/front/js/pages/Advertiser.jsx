import React from 'react';
import {Form, Button, FormGroup, FormLabel} from 'react-bootstrap';

export const Advertisers =() => {
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