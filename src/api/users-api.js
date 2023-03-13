import axiosClient from "./axios-client.js";

export const usersAPI = {
  addUder(req) {
    return axiosClient.post("./user/addUser", req);
  },
  getListUsers() {
    return axiosClient.get("./user/getListUser");
  },
  getProfile(req) {
    return axiosClient.get("./user/getProfile", { params: req });
  },
  updateProfile(req) {
    return axiosClient.put("./user/updateProfile", req);
  },
  deleteUser(req) {
    return axiosClient.delete("./user/deleteUser", { params: req });
  },
};
