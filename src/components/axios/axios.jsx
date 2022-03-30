import axios from "axios";

let api = () => {
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });
  api
    .get("/sanctum/csrf-cookie")
    .then()
    .catch((error) => {
      console.log(error);
    });
  if (localStorage.getItem("token")) {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }

  return api;
};
export default api;
