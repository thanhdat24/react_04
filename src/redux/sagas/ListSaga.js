import {
  ADD_TASK_LIST_API,
  DELETE_TASK_LIST_API,
  DONE_TASK_LIST_API,
  GET_TASK_API,
  GET_TASK_LIST_API,
  REJECT_TASK_LIST_API,
} from "../constants/ToDoListConst";
import { DiSPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { STATUS_CODE } from "../../util/constants/settingSystem";
import axios from "axios";
import { toDoListService } from "../../services/ToDoListService";

/* redux có 2 loại action:
  Loại 1: action => object (action thường)
  Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
  
*/
/* Chức năng getTask */
function* getTaskApiAction(action) {
  // Put giống dispatch action
  yield put({
    type: DiSPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    yield delay(500);
    if (status === STATUS_CODE.SUCCESS) {
      // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASK_LIST_API, getTaskApiAction);
}
/* Chức năng addTask */
function* addTaskApiAction(action) {
  const { taskName } = action;
  // gọi api
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_LIST_API,
      });
    }
  } catch (err) {
    console.log("error");
  }

  // Hiện thị loading
  // thành công thì load lại task = cách gọi action saga load taskList
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_LIST_API, addTaskApiAction);
}
/* Chức năng deleteTask */
function* deleteTaskApiAction(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        // Nếu thành công thì gọi lại action GET_TASK_LIST_API(action saga thực thi)
        type: GET_TASK_LIST_API,
      });
    }
  } catch (err) {
    console.log("error");
  }
}
export function* theoDoiActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_LIST_API, deleteTaskApiAction);
}
/* Chức năng doneTask */
function* doneTaskApiAction(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.doneTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        // Nếu thành công thì gọi lại action GET_TASK_LIST_API(action saga thực thi)
        type: GET_TASK_LIST_API,
      });
    }
  } catch (error) {
    console.log("error");
  }
}
export function* theoDoiActionDoneTaskApi() {
  yield takeLatest(DONE_TASK_LIST_API, doneTaskApiAction);
}
/* Chức năng rejectTask */
function* rejectTaskApiAction(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_LIST_API,
      });
    }
  } catch (error) {
    console.log("error");
  }
}
export function* theoDoiActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_LIST_API, rejectTaskApiAction);
}
