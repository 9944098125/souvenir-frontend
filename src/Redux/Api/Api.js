import Axios from "axios";

//to set up base urlx
const api = Axios.create({
  // baseURL: "http://localhost:5003/api/",
  baseURL: "https://souvenir-node.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      console.log(err.response);
    }
    return Promise.reject(err);
  }
);

export default api;
