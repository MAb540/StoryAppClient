import axios from "axios";
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
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../actionConstants/userConstants";

export const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const { data } = await axios.post(`/api/users/login`, {
      username,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    //  console.log(err.response);
    dispatch({ type: USER_SIGNIN_FAIL, payload: message });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      email,
      password,
    });
    console.log(data);
    const message = data.message;
    dispatch({ type: USER_REGISTER_SUCCESS, payload: message });
  } catch (err) {
    const message =
      err.response && err.response.data.errors
        ? err.response.data.errors
        : err.message;
    console.log(err.response);
    dispatch({ type: USER_REGISTER_FAIL, payload: message });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: AUTHOR_UPDATE_PROFILE_RESET });
  dispatch({ type: AUTHOR_INFO_RESET });
  dispatch({ type: USER_SIGNOUT });
};

export const authorInformation = (authorId) => async (dispatch) => {
  console.log(authorId);
  dispatch({ type: AUTHOR_INFO_REQUEST });
  try {
    const { data } = await axios.get(`/api/users/${authorId}`);

    dispatch({ type: AUTHOR_INFO_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    console.log(err.response);

    dispatch({ type: AUTHOR_INFO_ERROR, payload: message });
  }
};

export const updateAuthorProfile = (author) => async (dispatch, getState) => {
  console.log(author, "\n", "data coming from form");
  dispatch({ type: AUTHOR_UPDATE_PROFILE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put("/api/users/profile", author, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data, "\n", "data coming from backend");
    dispatch({ type: AUTHOR_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch(authorInformation(userInfo._id));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    // console.log(err.response)
    dispatch({ type: AUTHOR_UPDATE_PROFILE_FAIL, payload: message });
  }
};


export const listAuthor = () => async (dispatch) => {
  
  dispatch({ type: AUTHOR_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/users/`);

    dispatch({ type: AUTHOR_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    console.log(err.response);

    dispatch({ type: AUTHOR_LIST_FAIL, payload: message });
  }
};