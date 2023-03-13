import axiosClient from "./axios-client.js";

export const tasksAPI = {
  addTasks(req) {
    return axiosClient.post("./task/addTasks", req);
  },
  editTask(req) {
    return axiosClient.post("./task/editTask", req);
  },
  deleteTask(req) {
    return axiosClient.post("./task/deleteTask", req);
  },
  getListTasks(req) {
    return axiosClient.get("./task/getListTask", { params: req });
  },
  getListTaskAccordingMonth(req) {
    return axiosClient.get("./task/getListTaskAccordingMonth", { params: req });
  },
};
