import axiosClient from "./axios-client.js";

export const tasksAPI = {
  addTasks(req) {
    return axiosClient.post("./task/addTasks", req);
  },
  getListTasks(req) {
    return axiosClient.get("./task/getListTask", { params: req });
  },
};
