const INITITAL_STATE = {
  isUserLoggedIn: false,
};

export const user = (state = INITITAL_STATE, action) => {
  console.log("ACTION", action);
  switch (action.type) {
    case "USER_LOGGED_IN":
      return { ...state, isUserLoggedIn: true };
    case "SET_USER_DETAILS":
      return { ...state, user: action.user };
    default:
      return state;
  }
};
