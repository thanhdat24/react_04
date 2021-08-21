import { combineReducers, createStore } from "redux";

import ToDoListReducer from "./ToDoListReducer";

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  ToDoListReducer,
});

const store = createStore(rootReducer);

export default store;
