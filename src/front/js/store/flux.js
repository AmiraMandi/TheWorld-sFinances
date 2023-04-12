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

                } catch (error) {
                    console.log(error);
                    setStore({
                        registroError: true,
                    });
                }
            },


            getNews: async (keywords) => {

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

                        const data = await resp.json();

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

// fetch suggestionbox


export default getState;