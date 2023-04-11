import React from 'react';
import { Form, Button, FormGroup, FormLabel } from 'react-bootstrap';

export const Suggestion = () => {
    return (
        <div className='container'>
            <Form>
                <FormGroup>
                    <FormLabel>Full Name</FormLabel>
                    <Form.Control type="text" placeholder="Georgio Gyovchev" />
                </FormGroup>
                <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
             
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>What do you want to suggest us?</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant='info' type='submit' className='mx-auto'>submit</Button>
            </Form>
        </div>
    );
}

export default Suggestion