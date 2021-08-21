import { ADD_TASK_API, GET_TASK_API } from "../constants/ToDoListConst";

import axios from "axios";

export const getTaskAction = (taskList) => ({
  type: GET_TASK_API,
  taskList,
});

export const getTaskListApi = () => {
  // Tiền xử lý dữ liệu =? xử lý function
  return (dispatch) => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((results) => {
      console.log(results.data);
      // Nếu kết quả success
      // => set lại state của component
      dispatch(getTaskAction(results.data));
      console.log("Thành Công");
    });
    promise.catch((err) => {
      console.log("Thất bại");
      console.log(err.response.data);
    });
  };
};

export const addTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
    // Xử lý thành công
    promise.then((results) => {
      // console.log(results.data);
      dispatch(getTaskListApi());
    });

    // Xử lý thất bại
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((results) => {
      alert(results.data);
      dispatch(getTaskListApi());
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((results) => {
      alert(results.data);
      dispatch(getTaskListApi());
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((results) => {
      alert(results.data);
      dispatch(getTaskListApi());
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
