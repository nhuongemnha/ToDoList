import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { actionType } from "../actions/types";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: false },
    { id: "task-3", taskName: "task 3", done: true },
    { id: "task-4", taskName: "task 4", done: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.add_task:
      console.log(action.payload.taskName, 123);
      // Kiểm tra rỗng
      if (action.payload.taskName.trim() === "") {
        alert("Task name is required!");
        return { ...state };
      }
      // Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList];
      console.log(taskListUpdate, 12312415);
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.payload.taskName
      );
      if (index !== -1) {
        alert("Task name is already exists!");
      }
      taskListUpdate.push(action.payload);
      state.taskList = taskListUpdate;
      return { ...state };

    case actionType.change_theme:
      console.log(action.payload);
      let theme = arrTheme.find((theme) => theme.id == action.payload);
      if (theme) {
        state.themeToDoList = theme.theme;
      }
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
