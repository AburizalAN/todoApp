import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer";
import BlogReducer from "./BlogReducer";
import GlobalReducer from "./GlobalReducer";

const reducer = combineReducers({TodoReducer, BlogReducer, GlobalReducer});

export default reducer;