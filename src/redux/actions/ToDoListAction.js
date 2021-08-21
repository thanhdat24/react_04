import { GET_TASK_API } from "../constants/ToDoListConst";

export const getTaskAction = (taskList) => ({
  type: GET_TASK_API,
  taskList,
});
