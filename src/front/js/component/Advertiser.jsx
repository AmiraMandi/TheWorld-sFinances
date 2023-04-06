import React from 'react';
import {Form, Button} from 'react-bootstrap';

export const Advertisers =() => {
  return ( 
    <div className='container'>
       <Form>
      <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>What do you want to offer us?</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant='warning' type='submit' className='mb-3'>submit</Button>
    </Form>
    </div>
  );
}

export default Advertisers