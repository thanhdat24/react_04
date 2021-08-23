import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { GET_TASK_API } from "../constants/ToDoListConst";
import axios from "axios";
import { toDoListService } from "../../services/ToDoListService";

/* redux có 2 loại action:
  Loại 1: action => object (action thường)
  Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
  
*/
function* getTaskApiAction(action) {
  let { data, status } = yield call(toDoListService.getTaskApi);
  // sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
  yield put({
    type: GET_TASK_API,
    taskList: data,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest("getTaskApiAction", getTaskApiAction);
}
