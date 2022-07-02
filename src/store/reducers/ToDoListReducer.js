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
  taskEdit: { id: "-1", taskName: "", done: false },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.add_task: {
      console.log(action.payload.taskName, 123);
      // Kiểm tra rỗng
      if (action.payload.taskName.trim() === "") {
        alert("Task name is required!");
        return { ...state };
      }
      // Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.payload.taskName
      );
      if (index !== -1) {
        alert("Task name is already exists!");
        return { ...state };
      }
      taskListUpdate.push(action.payload);
      state.taskList = taskListUpdate;
      return { ...state };
    }

    case actionType.change_theme: {
      console.log(action.payload);
      let theme = arrTheme.find((theme) => theme.id == action.payload);
      if (theme) {
        state.themeToDoList = theme.theme;
      }
      return { ...state };
    }
    case actionType.done_task: {
      console.log(action.payload);
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.id === action.payload
      );
      if (index !== -1) {
        console.log(taskListUpdate[index]);
        taskListUpdate[index].done = true;
      }
      // state.taskList = taskListUpdate;

      return { ...state, taskList: taskListUpdate };
    }
    case actionType.delete_task:
      console.log(action);
      let taskListUpdate = [...state.taskList];
      taskListUpdate = taskListUpdate.filter(
        (task) => task.id !== action.payload
      );
      state.taskList = taskListUpdate;
      return { ...state, taskList: taskListUpdate };
    case actionType.edit_task: {
      console.log(action.payload);
      return { ...state, taskEdit: action.payload };
    }
    case actionType.update_task: {
      state.taskEdit = { ...state.taskEdit, taskName: action.payload };
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );
      console.log(index);
      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", taskName: "", done: false };

      return { ...state };
    }
    default:
      return state;
  }
};
export default reducer;
