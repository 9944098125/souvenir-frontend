import api from "../Redux/Api/Api";

const SetAuthToken = (token) => {
  console.log("token: ", token);
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

export default SetAuthToken;
