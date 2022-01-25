import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, currentUser: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: "Aucun compte actif trouvé avec les informations d’identification données" };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };

    case USER_PROFILE_SUCCESS:
      return { loading: false, currentUser: action.payload };

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
