import { createStore } from "redux";
import FrontEndApp from "./reducers";

const store = createStore(FrontEndApp);
export default store;
