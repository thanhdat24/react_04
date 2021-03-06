import {} from "./ToDoList.css";

import React, { useEffect, useState } from "react";

import axios from "axios";

export default function ToDoListRFC(props) {
  let [state, setState] = useState({
    taskList: [],
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

  const addTask = (e) => {
    e.preventDefault();
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: state.values.taskName,
      },
    });
    // Xử lý thành công
    promise.then((results) => {
      // console.log(results.data);
      getTaskList();
    });

    // Xử lý thất bại
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  const getTaskList = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((results) => {
      console.log(results.data);
      // Nếu kết quả success
      // => set lại state của component
      setState({
        ...state,
        taskList: results.data,
      });
      console.log("Thành Công");
    });
    promise.catch((err) => {
      console.log("Thất bại");
      console.log(err.response.data);
    });
  };
  useEffect(() => {
    getTaskList();
  }, []);
  const renderTaskToDo = () => {
    return state.taskList
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
    return state.taskList
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
  const deleteTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((results) => {
      alert(results.data);
      getTaskList();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  const checkTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((results) => {
      alert(results.data);
      getTaskList();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  const rejectTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((results) => {
      alert(results.data);
      getTaskList();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
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
