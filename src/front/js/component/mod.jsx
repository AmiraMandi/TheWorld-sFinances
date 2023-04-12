import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { Login } from './login.jsx';
import { Registro } from './registro.jsx';
export const Mod =() => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


//   const { actions } = useContext(Context);
//   const [showTutorForm, setShowTutorForm] = useState(false);
//   const [showAdvertiserForm, setShowAdvertiserForm] = useState(false);
//   const [tutorData, setTutorData] = useState({ name: "", lastName: "", birthDate: "", city: "", children: [{ name: "", lastName: "", birth: "" }] });
//   const [advertiserData, setAdvertiserData] = useState({ name: "", lastName: "", contact: "", avatar: "", company: "", working_since: "", twitter: "", birthDate: "", city: "" });
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleTutorCheck = (e) => {
//     setShowTutorForm(e.target.checked);
//   };

//   const handleAdvertiserCheck = (e) => {
//     setShowAdvertiserForm(e.target.checked);
//   };

//   const addChild = () => {
//     setTutorData({ ...tutorData, children: [...tutorData.children, { name: "", lastName: "", birth: "" }] });
//   };

//   const handleTutorFormSubmit = (token) => {
//     actions.createTutor(email, tutorData, token);
//     actions.modifyTutor(email, tutorData, token);
//     console.log(`Esta es la información almacenada en Tutor Data: ${JSON.stringify(tutorData, null, 2)}`, showTutorForm);
//   };
    
//   const handleAdvertiserFormSubmit = (token) => {
//     actions.createAdvertiser(email, advertiserData, token);
//     console.log(`Esta es la información almacenada en Advertiser Data: ${JSON.stringify(advertiserData, null, 2)}`);
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (showTutorForm || showAdvertiserForm) {
//       setErrorMessage('');
//       const isRegistered = await actions.register(email, password, setShowTutorForm, setShowAdvertiserForm, tutorData, advertiserData);
//       if (isRegistered) {
//         const token = await actions.login(email, password);
//         if (token) {
//           // Almacenar el email en el localStorage con la key "username"
//           localStorage.setItem("username", email);
  
//           if (showTutorForm) {
//             handleTutorFormSubmit(token);
//           } 
//           if (showAdvertiserForm) { 
//             handleAdvertiserFormSubmit(token);
//           }
//         }
//       } else {
//         setErrorMessage('Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.');
//       }
//     } else {
//       setErrorMessage('Por favor, selecciona una opción antes de continuar.');
//     }
//   };
  

  const handleInputChange = (e, index, child) => {
    const { name, value } = e.target;
    if (child) {
      const updatedChildren = [...tutorData.children];
      updatedChildren[index][name] = value;
      setTutorData({ ...tutorData, children: updatedChildren });
    } else {
      setTutorData({ ...tutorData, [name]: value });
    }
  };

  const handleInputChangeAdv = (e) => {
    const { name, value } = e.target;
    setAdvertiserData({ ...advertiserData, [name]: value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
    
        <Modal.Body>
         <Login/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

