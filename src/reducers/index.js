import { combineReducers } from "redux";

import data from "./gameDataReducer";
import { user } from "./user/reducer";

export default combineReducers({
  data,
  user,
});
