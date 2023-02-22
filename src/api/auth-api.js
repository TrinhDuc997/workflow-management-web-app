import axiosClient from "./axios-client.js";

export const authAPI = {
  login(payload) {
    return axiosClient.post("./user/login", payload);
  },
  logOut() {
    return axiosClient.post("./logout");
  },
};
