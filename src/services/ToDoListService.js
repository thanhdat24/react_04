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
}

export const toDoListService = new ToDoListService();
