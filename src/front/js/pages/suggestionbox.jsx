import React,{useState} from 'react';
import { Form, Button, FormGroup, FormLabel } from 'react-bootstrap';

export const Suggestion = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [suggestion, setSuggestion] = useState("");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        //__fetch__
        //Blaquear todos los state setFullName(""),setEmail(""),setSuggestion("") 
    }
    return (
        <div className='container'>
            <Form onSubmit={(e)=>handleSubmit() }>
                <FormGroup>
                    <FormLabel>Full Name</FormLabel>
                    <Form.Control type="text"  value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Georgio Gyovchev" />
                </FormGroup>
                <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                </Form.Group>
             
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>What do you want to suggest us?</Form.Label>
                    <Form.Control as="textarea" value={suggestion} onChange={(e)=>setSuggestion(e.target.value)} rows={3} />
                </Form.Group>
                <Button variant='info' type='submit' className='mx-auto'>submit</Button>
            </Form>
        </div>
    );
};

export default Suggestion