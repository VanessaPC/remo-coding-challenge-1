import { createAction } from "redux-create-action";

export const logInUser = createAction("USER_LOGGED_IN");
export const setUserDetails = createAction("SET_USER_DETAILS", "user");
