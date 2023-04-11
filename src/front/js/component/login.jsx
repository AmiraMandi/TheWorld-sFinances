import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"
import { auth, provider } from "../store/firebase";
import { signInWithPopup } from "firebase/auth";
import "../../styles/registro.css";
import { GoogleButton } from 'react-google-button';

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** Compruebo que los campos no se encuentren vacios, si estan completos, mando datos a metodo login en flux
   * si no es asi salta un alert que indica al usuario que debe rellenar los campos del formulario login
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      console.log("Hola")
      actions.login(email, password);
    } else {
      actions.notify("Fill in all fields");
      console.log(password);
    }

  };

  const [value,setValue] = useState('')
  const handleGoogleSignIn =()=>{
      signInWithPopup(auth,provider).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem("email",data.user.email)
      })
  }

  useEffect(()=>{
      setValue(localStorage.getItem('email'))
  })

  return (
    <>
      {store.token ? (
        <Navigate to={"/home"} />
      ) : (
        <div className="min-vh-100 container-principal-login">
          <div className="contenedor-formulario contenedor-login d-flex justify-content-center align-items-center col-10">
            <form className="formulario-registro">
              <h2 className="titulo-registro text-center"> Sign in </h2>
              <input
                type="email"
                className="input-registro"
                id="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setEmail(e.target.value)
                } /** Assign the value with onChange to the email variable */
                value={email}
              />
              <input
                type="password"
                className="input-registro"
                autoComplete="on"
                id="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setPassword(e.target.value)
                } /** Assign the value with onChange to the password variable */
                value={password}
              />
              <div className="d-flex flex-column">
                <button onClick={handleSubmit} className="boton-registro mb-2">
                  Access
                </button>
                <div className='max-w-[240px] m-auto'>
                  {value?<Navigate to={"/home"}/>:
                   <GoogleButton  onClick={handleGoogleSignIn} />
                  }
                </div>
                <Link to={"/registration"} className="text-center buttons-login">
                  Don't have an account? Register
                </Link>
              </div>
            </form>
          </div>
          {/* <div>
            Alert component <Alert /> 
           </div> */}
        </div>
      )}
    </>
  )
};
