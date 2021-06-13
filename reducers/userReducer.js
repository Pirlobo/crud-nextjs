import types from "../util/ActionTypes";

const { SET_CURRENT_USER } = types;
const user = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
