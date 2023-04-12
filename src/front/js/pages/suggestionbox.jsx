import React, { useState, useContext, useEffect, useSyncExternalStore } from "react";
import { Form, Button, FormGroup, FormLabel } from 'react-bootstrap';
import { Context } from "../store/appContext";

export const Suggestion = () => {
    const { store, actions } = useContext(Context);

    useEffect(()=>{
    actions.displayOffNews();
    
   },[])

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [suggestion, setSuggestion] = useState("");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //__fetch__
        //Blaquear todos los state setFullName(""),setEmail(""),setSuggestion("") 
        const SuggestionBox  = async (fullName, email, suggestion) => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName:fullName,
                    email: email,
                    suggestion: suggestion,
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
        SuggestionBox(fullName,email,suggestion)
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