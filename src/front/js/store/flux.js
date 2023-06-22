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
            displayNews: true,
            displayReadMe: false,
            isLogin: false,
        },
        actions: {
            displayOffNews: () => {
                setStore({
                    displayNews: false,
                });
            },
            displayOnNews: () => {
                setStore({
                    displayNews: true,
                });
            },
            displayOffReadMe: () => {
                setStore({
                    displayReadMe: false,
                });
            },
            displayOnReadMe: () => {
                setStore({
                    displayReadMe: true,
                });
            },
            isLoginTrue: () => {
                setStore({
                    isLogin: true,
                });
            },
            isLoginFalse: () => {
                setStore({
                    isLogin: false,
                });
            },

            registro: async (email, password) => {
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
                    // fetching data from the backend
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/signup",
                        options
                    );
                    if (response.status === 200) {
                        setStore({
                            registro: true,
                        });
                    }
                    // const data = await response.json();
                    // setStore({
                    //     registro: false,
                    // });
                } catch (error) {
                    console.log(error);
                    setStore({
                        registroError: true,
                    });
                }
            },


            getNews: async (keywords) => {
                //To-DO: Definir dentro del requestOptions un body donde pueda pasar un parámetro "category" que vaya a recibir el back. Si no recibe ninguno, enviarlo vacío o por default(general)
                let requestOptions = {
                    method: "GET",
                    redirect: "follow",
                };

                fetch(
                        process.env.BASENAME +
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
                            displayNews: true,
                            displayReadMe: true,
                            isLogin: true,
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

// fetch suggestionbox




export default getState;