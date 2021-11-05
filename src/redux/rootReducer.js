import { combineReducers } from "redux";
import reducer from "./reducer/reducer";

const rootReducer = combineReducers({
  replacementSystem: reducer,
});

export default rootReducer;
