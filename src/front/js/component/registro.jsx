import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
/*Importo el css individual para registro */
import "../../styles/registro.css";
import { Context } from "../store/appContext";
// Importo componente alert
// import Alert from "../component/Alert";

export const Registro = () => {
  const { store, actions } = useContext(Context);

  /* Utilizo useState donde asigno valores de los input*/

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (

      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
      password !== "" &&
      password === passwordRepeat
    ) {
      actions.registro(email, password);
    } else {
      // actions.notify(
      //   "Completa todos los campos de forma correcta, recuerda que nombre solo puede contener letras"
      // );
    }
  };

  // useEffect(() => {
  //   if (store.registroError) {
  //     actions.notifyError("Error al realizar el registro");
  //     actions.registroErrorReset();
  //   }
  // }, [store.registroError]);

  useEffect(() => {
    console.log("registro", store.registro);
  }, [store.registro])

  return (
    <>
      {store.registro ? (
        <Navigate to={"/login"} />
      ) : (
        <div className="min-vh-100 contenedor">
          <div className="contenedor-formulario d-flex justify-content-center align-items-center col-10 ">
            <form
              onSubmit={handleSubmit}
              className="formulario-registro col-9 my-auto"
            >
              <h2 className="titulo-registro text-center"> Registro </h2>

              <input
                type="email"
                className="input-registro"
                id="email"
                placeholder="Enter your email (name@gmail.com)"
                onChange={(e) =>
                  setEmail(e.target.value)
                } /** Asigno el valor con onChange a la variable email */
                value={email}
              />
              <input
                type="password"
                className="input-registro"
                id="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setPassword(e.target.value)
                } /** Asigno el valor con onChange a la variable nombre */
                value={password}
              />
              <input
                type="password"
                className="input-registro"
                id="password-repeat"
                placeholder="Confirm password"
                onChange={(e) =>
                  setPasswordRepeat(e.target.value)
                } /** Asigno el valor con onChange a la variable nombre */
                value={passwordRepeat}/>
              <div className="col-12 pl-2 d-flex justify-content-end my-2">
                <Link to="/login">
                  <button className="boton-registro me-2"> Return </button>
                </Link>
                <button className="boton-registro">Create an account </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
