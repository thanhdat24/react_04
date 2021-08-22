import { applyMiddleware, combineReducers, createStore } from "redux";

import ToDoListReducer from "./ToDoListReducer";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import { rootSaga } from "../sagas/rootSaga";

// middleware saga
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  ToDoListReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);
// Call saga
middlewareSaga.run(rootSaga);

export default store;
