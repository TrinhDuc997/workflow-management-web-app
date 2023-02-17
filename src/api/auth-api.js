import axiosClient from "./axios-client.js";

export const authAPI = {
  login(payload) {
    return axiosClient.post("./user/login", payload);
  },
  getProfile() {
    return axiosClient.get("./profile");
  },
  logOut() {
    return axiosClient.post("./logout");
  },
};
