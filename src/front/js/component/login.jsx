import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"
import { Auth } from "firebase/auth";
import "../../styles/registro.css";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  // const signInWithPopUp = (e) => {
  //   e.preventDefault();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info
  //       const user = result.user;

  //     })
  //     .catch((error) => {
  //       // Handle error here
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The emails of the user´s account used
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used

  //     });
  // };

  // When the data sent to the backend is incorrect, invoke alert
  // useEffect(() => {
  //   if (store.errorAuth) {
  //     actions.notify("Incorrect email or password");
  //     actions.errorAuth();
  //   }
  // }, [store.errorAuth]);

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
                <button
                  // onClick={signInWithPopUp}
                  className="boton-registro mb-2"
                >
                  <i className="fab fa-google me-2"> </i>
                  Access with Google
                </button>
                <Link
                  to={"/passwordRecovery"}
                  className="text-center buttons-login"
                >
                  Forgot your password? Recover it
                </Link>
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
