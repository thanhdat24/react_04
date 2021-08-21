import { GET_TASK_API } from "../constants/ToDoListConst";

const initialState = {
  taskList: [],
};

export const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_API:
      state.taskList = action.taskList;
      return { ...state };

    default:
      return state;
  }
};

export default ToDoListReducer;
