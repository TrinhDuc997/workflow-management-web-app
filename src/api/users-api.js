import axiosClient from "./axios-client.js";

export const usersAPI = {
  getListUsers() {
    return axiosClient.get("./user/getListUser");
  },
};
