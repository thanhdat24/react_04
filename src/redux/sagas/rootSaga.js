import { fork, take } from "redux-saga/effects";

/* redux có 2 loại action:
  Loại 1: action => object (action thường)
  Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
  
*/
function* getTaskApi() {
  while (true) {
    yield take("getTaskApiAction"); // theo dõi action => xem action vào dispatch mới làm công việc mới
    console.log("getTaskApi");
    // call api dispatch lên reducer ...
  }
}
export function* rootSaga() {
  yield fork(getTaskApi); // not blocking chạy kh cần chờ
}
