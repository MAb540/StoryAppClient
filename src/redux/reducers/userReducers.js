import {
  AUTHOR_INFO_ERROR,
  AUTHOR_INFO_REQUEST,
  AUTHOR_INFO_RESET,
  AUTHOR_INFO_SUCCESS,
  AUTHOR_LIST_FAIL,
  AUTHOR_LIST_REQUEST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_UPDATE_PROFILE_FAIL,
  AUTHOR_UPDATE_PROFILE_REQUEST,
  AUTHOR_UPDATE_PROFILE_RESET,
  AUTHOR_UPDATE_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../actionConstants/userConstants";

export const authorListReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_LIST_REQUEST:
      return { ...state, loading: true };

    case AUTHOR_LIST_SUCCESS:
      return { ...state, loading: false, authors: action.payload };

    case AUTHOR_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateAuthorProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case AUTHOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };

    case AUTHOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case AUTHOR_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const authorInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHOR_INFO_REQUEST:
      return { ...state, loading: true };

    case AUTHOR_INFO_SUCCESS:
      return { ...state, loading: false, authorBio: action.payload };

    case AUTHOR_INFO_ERROR:
      return { ...state, loading: false, error: action.payload };

    case AUTHOR_INFO_RESET:
      return {};
    default:
      return state;
  }
};

export const userSignReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, registerInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};
