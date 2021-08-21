import React, { useEffect, useState } from "react";
import {
  addTaskApi,
  checkTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";
import { useDispatch, useSelector } from "react-redux";

// Action có 2 loại
// Action thực thi ngay làm thay đổi reducer (action 1)
// Action phải thực hiện xử lí rồi mới gọi action 1 thực thi (async action)
export default function ToDoListRedux() {
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();
  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });
  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " is not a valid";
    } else newErrors[name] = "";

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  checkTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  // Task completed
  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };
  const addTask = (e) => {
    e.preventDefault();
    // Xử lý nhận dữ liệu từ người dùng => gọi action addTaskApi()
    dispatch(addTaskApi(state.values.taskName));
  };
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };
  useEffect(() => {
    getTaskList();
  }, []);
  const deleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };
  return (
    <div className="card">
      <div className="card__header">
        <img src="./assets/background.png" alt="background" />
      </div>
      {/* <h2>hello!</h2> */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              name="taskName"
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              onChange={handleChange}
            />
            <button id="addItem">
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
