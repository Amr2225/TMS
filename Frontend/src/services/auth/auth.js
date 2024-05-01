import { jwtDecode } from "jwt-decode";
import { persistor } from "../../Redux/store";

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
  return jwtDecode(token);
};

export const getAuthToken = () => {
  if (localStorage.getItem("token")) {
    const user = jwtDecode(localStorage.getItem("token"));
    if (Date.now() >= user.exp * 1000) {
      // remove token
      removeAuthToken();
      return {};
    }
    return { token: localStorage.getItem("token"), user: user };
  } else {
    return {};
  }
};

export const removeAuthToken = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
  persistor.purge();
};
