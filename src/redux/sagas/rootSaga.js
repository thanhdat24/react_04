import * as ListSaga from "./ListSaga";

import { all } from "redux-saga/effects";

// import { theoDoiActionGetTaskApi } from "./ListSaga";

export function* rootSaga() {
  yield all([
    // Nghiệp vụ theo dỗi các action saga todolist
    ListSaga.theoDoiActionGetTaskApi(),
    ListSaga.theoDoiActionAddTaskApi(),
    // Nghiệp ...
  ]);
}
