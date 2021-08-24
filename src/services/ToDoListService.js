import { DOMAIN } from "../util/constants/settingSystem";
import axios from "axios";

export class ToDoListService {
  constructor() {}
  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };
  addTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };
}

export const toDoListService = new ToDoListService();
