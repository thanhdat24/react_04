import {} from "./ToDoList.css";

import React, { Component } from "react";

import axios from "axios";

export default class ToDoListRCC extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };
  getTaskList = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((results) => {
      console.log(results.data);
      // Nếu kết quả success
      // => set lại state của component
      this.setState({
        taskList: results.data,
      });
      console.log("Thành Công");
    });
    promise.catch((err) => {
      console.log("Thất bại");
      console.log(err.response.data);
    });
  };
  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete">
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  renderTaskToDoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete">
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  componentDidMount = () => {
    this.getTaskList();
  };

  handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " is not a valid";
    } else newErrors[name] = "";

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };
  addTask = (e) => {
    // Dừng sự kiện submit form
    e.preventDefault();
    console.log(this.state.values.taskName);
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: this.state.values.taskName,
      },
    });
    // Xử lý thành công
    promise.then((results) => {
      // console.log(results.data);
      this.getTaskList();
    });

    // Xử lý thất bại
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button> */}
        <div className="card">
          <div className="card__header">
            <img src="./assets/background.png" alt="background" />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input
                  onChange={this.handleChange}
                  name="taskName"
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p className="text text-danger mb-0">
                {this.state.errors.taskName}
              </p>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
