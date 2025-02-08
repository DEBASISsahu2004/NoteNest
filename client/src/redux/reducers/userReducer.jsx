const initialState = {
  profilePic: "",
  username: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_PIC":
      return {
        ...state,
        profilePic: action.payload,
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
