/** Importo las librerias para crear alert de registro erroneo */
// import {
//     ToastContainer,
//     toast,
//     Zoom
// } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            registro: false,
            registroError: false,
            mailOk: false,
            mailError: false,
            auth: false,
            errorAuth: false,
            errorNoLogin: false,
            userInfo: null,
            token: null,
        },
        actions: {
            // Alerts
            notify: (mensaje) =>
                toast.warn(mensaje, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Zoom,
                }),

            notifyOk: (mensaje) =>
                toast.info("🦄 " + mensaje, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Zoom,
                }),

            notifyError: (mensaje) =>
                toast.error(mensaje, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Zoom,
                }),

            // Reinicio valor errorNoLogin a false
            errorNoLogin: (reset = false) => {
                if (reset) {
                    // Reinicio valor errorNoLogin a false
                    setStore({
                        errorNoLogin: false,
                    });
                } else {
                    setStore({
                        errorNoLogin: true,
                    });
                }
            },

            // Reinicio valor emailOk a false
            emailOkReset: () => {
                setStore({
                    mailOk: false,
                });
            },

            // Reinicio valor emailError a false
            emailErrorReset: () => {
                setStore({
                    mailError: false,
                });
            },

            // Recuperacion de Password mediante correo electrónico
            RecuperacionPassword: async (email) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                };
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/recuperarPassword",
                        options
                    );
                    if (response.status === 200) {
                        setStore({
                            mailOk: true,
                        });
                    } else {
                        setStore({
                            mailError: true,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    setStore({
                        mailError: true,
                    });
                }
            },

            // Reinicio valor registroError a false
            registroErrorReset: () => {
                setStore({
                    registroError: false,
                });
            },

            // Registro
            registro: async (nombre, email, password, artista) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        email: email,
                        password: password,
                        artista: artista,
                        nacimiento: null,
                        foto_usuario: null,
                        descripcion: null,
                    }),
                };
                try {
                    // fetching data from the backend
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/registration",
                        options
                    );
                    if (response.status === 200) {
                        setStore({
                            registro: true,
                        });
                    }
                    const data = await response.json();
                    setStore({
                        registro: false,
                    });
                } catch (error) {
                    console.log(error);
                    setStore({
                        registroError: true,
                    });
                }
            },

            news: [],
            message: null,
            // demo: [
            //   {
            //     title: "FIRST",
            //     background: "white",
            //     initial: "white",
            //   },
            //   {
            //     title: "SECOND",
            //     background: "white",
            //     initial: "white",
            //   },
            // ],
        },
        actions: {
            // Use getActions to call a function within a fuction
            // exampleFunction: () => {
            //   getActions().changeColor(0, "green");
            // },

            // getMessage: async () => {
            //   try {
            //     // fetching data from the backend
            //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
            //     const data = await resp.json();
            //     setStore({ message: data.message });
            //     // don't forget to return something, that is how the async resolves
            //     return data;
            //   } catch (error) {
            //     console.log("Error loading message from backend", error);
            //   }
            // },
            // changeColor: (index, color) => {
            //   //get the store
            //   const store = getStore();

            //   //we have to loop the entire demo array to look for the respective index
            //   //and change its color
            //   const demo = store.demo.map((elm, i) => {
            //     if (i === index) elm.background = color;
            //     return elm;
            //   });

            //   //reset the global store
            //   setStore({ demo: demo });
            // },
            // getNews: async () => {
            //   const response = await fetch("/api/newsmediastack"); // Replace with your API endpoint
            //   console.log(response)
            //   const data = await response.pagination.json();
            //   console.log(data)
            //   setStore({news: data});
            // },
            getNews: async (keywords) => {
                //To-DO: Definir dentro del requestOptions un body donde pueda pasar un parámetro "category" que vaya a recibir el back. Si no recibe ninguno, enviarlo vacío o por default(general)
                let requestOptions = {
                    method: "GET",
                    redirect: "follow",
                };

                fetch(
                        process.env.BACKEND_URL +
                        `/api/newsmediastack${keywords ? `?keywords=${keywords}` : ""}`
                    )
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        console.log(result.data);
                        setStore({
                            news: result.data,
                        });
                    })
                    .catch((error) => console.log("error", error));
            },

            // Fecth de Login
            login: async (email, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };
                try {
                    const resp = await fetch(
                        process.env.BACKEND_URL + "/api/login",
                        options
                    );
                    if (resp.status === 200) {
                        // setStore({
                        //     auth: true,
                        // });
                        const data = await resp.json();
                        // sessionStorage.setItem("token", data.token); // accedemos a la key acces_token de data

                        // setStore({
                        //     userInfo: data.user_info,
                        // });

                        // const userInfoStrfy = JSON.stringify(getStore().userInfo);
                        // localStorage.setItem("userInfo", userInfoStrfy);
                        // return true; // Devuelve true para que se ejecute la acción que llamamos en Login

                        setStore({
                            token: data.token,
                        });

                        const userToken = JSON.stringify(data.token);
                        localStorage.setItem("token", userToken);
                    } else if (resp.status === 401) {
                        setStore({
                            errorAuth: true,
                        });
                    } else if (resp.status === 404) {
                        setStore({
                            errorAuth: true,
                        });
                    }
                } catch (error) {
                    setStore({
                        errorAuth: true,
                    });
                }
            },
            // logoutButtonNavbar
            logout: () => {
                setStore({
                    auth: false,
                    userInfo: {},
                    direccion: {},
                });
                sessionStorage.removeItem("token");

                setStore({
                    productosCesta: [],
                });
            },
        },
    };
};

export default getState;