const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
    isLogin: true,
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
      getNews: async() => {
        //To-DO: Definir dentro del requestOptions un body donde pueda pasar un parámetro "category" que vaya a recibir el back. Si no recibe ninguno, enviarlo vacío o por default(general)
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://3001-amiramandi-theworldsfin-tct6o3g5z63.ws-eu92.gitpod.io/api/newsmediastack", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          console.log(result.data);
          setStore({news: result.data});
        })
        .catch(error => console.log('error', error));
      
    }
    },
  };

};

export default getState;
