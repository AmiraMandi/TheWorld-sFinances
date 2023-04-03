import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

// Importo componente alert

export const Registro = () => {
    const { store, actions } = useContext(Context);
  
    /* Use useState to assign input values */
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [artista, setArtista] = useState(false);
  
    /** Retrieve true or false value according to whether they want an artist profile or not, and assign it to artista */
    const handleInputChange = (e) => {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      setArtista(value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        nombre !== "" &&
        /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i.test(nombre) &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
        password !== "" &&
        password === passwordRepeat
      ) {
        actions.registro(nombre, email, password, artista);
      } else {
        actions.notify(
          "Please complete all fields correctly, remember that the name field can only contain letters."
        );
      }
    };
  
    useEffect(() => {
      if (store.registroError) {
        actions.notifyError("Registration failed");
        actions.registroErrorReset();
      }
    }, [store.registroError]);
  
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
                <h2 className="titulo-registro text-center"> Registration </h2>
                <input
                  type="text"
                  className="input-registro"
                  id="nombre"
                  placeholder="Enter your full name"
                  onChange={(e) => setNombre(e.target.value)}
                  /** Assign the value with onChange to the variable "nombre" */
                  value={nombre}
                />
                <input
                  type="email"
                  className="input-registro"
                  id="email"
                  placeholder="Enter your email (name@gmail.com)"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  } /** Assign the value with onChange to the variable "email" */
                  value={email}
                />
                <input
                  type="password"
                  className="input-registro"
                  id="password"
                  placeholder="Enter a password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  } /** Assign the value with onChange to the variable "password" */
                  value={password}
                />
                <input
                  type="password"
                  className="input-registro"
                  id="password-repeat"
                  placeholder="Repeat Password"
                  onChange={(e) =>
                    setPasswordRepeat(e.target.value)
                  } /** Assign the value with onChange to the variable "passwordRepeat" */
                  value={passwordRepeat}
                />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => handleInputChange(e)}
                />
                </div>
              <div className="col-12 pl-2 d-flex justify-content-end my-2">
                <Link to="/login">
                  <button className="boton-registro me-2"> Back </button>
                </Link>
                <button className="boton-registro"> Signup </button>
              </div>
            </form>
          </div>
          
        </div>
      )}
    </>
  );
};
