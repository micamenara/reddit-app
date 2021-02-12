import { combineReducers } from "redux";
import postReducer from "./post";

const FrontEndApp = combineReducers({
  app: postReducer,
});

export default FrontEndApp;
