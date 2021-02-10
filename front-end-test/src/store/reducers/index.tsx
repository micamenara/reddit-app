import { combineReducers } from "redux";
import postReducer from "./post";

const FrontEndApp = combineReducers({
  post: postReducer,
});

export default FrontEndApp;
