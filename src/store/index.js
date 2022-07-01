import { combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";

const reducer = combineReducers({
  ToDoListReducer,
});
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
