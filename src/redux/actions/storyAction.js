import axios from "axios";
import {
  STORY_AUTHOR_LIST_ERROR,
  STORY_AUTHOR_LIST_REQUEST,
  STORY_AUTHOR_LIST_SUCCESS,
  STORY_CREATE_ERROR,
  STORY_CREATE_REQUEST,
  STORY_CREATE_SUCCESS,
  STORY_DELETE_ERROR,
  STORY_DELETE_REQUEST,
  STORY_DELETE_SUCCESS,
  STORY_DETAIL_ERROR,
  STORY_DETAIL_REQUEST,
  STORY_DETAIL_SUCCESS,
  STORY_LIST_ERROR,
  STORY_LIST_REQUEST,
  STORY_LIST_SUCCESS,
  STORY_MYSTORIES_LIST_ERROR,
  STORY_MYSTORIES_LIST_REQUEST,
  STORY_MYSTORIES_LIST_SUCCESS,
  STORY_UPDATE_ERROR,
  STORY_UPDATE_REQUEST,
  STORY_UPDATE_SUCCESS,
} from "../actionConstants/storyConstants";

export const listStories = () => async (dispatch) => {
  dispatch({ type: STORY_LIST_REQUEST });

  try {
    const { data } = await axios.get("api/stories");
    dispatch({ type: STORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: STORY_LIST_ERROR, payload: err.message });
  }
};

export const detailsStory = (storyId) => async (dispatch) => {
  dispatch({ type: STORY_DETAIL_REQUEST });

  try {
    const { data } = await axios.get(`/api/stories/${storyId}`);
    dispatch({ type: STORY_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    
    dispatch({ type: STORY_DETAIL_ERROR, payload: 'story with given id not found' });
  }
};

export const authorListStories = (authorId) => async (dispatch) => {
  dispatch({ type: STORY_AUTHOR_LIST_REQUEST });

  try {
    const { data } = await axios.get(`/api/stories/author/${authorId}`);
    dispatch({ type: STORY_AUTHOR_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.message.data
        : err.message;
    console.log(message);
    dispatch({ type: STORY_AUTHOR_LIST_ERROR, payload: message });
  }
};

export const ListmyStories = () => async (dispatch,getState) => {
  dispatch({ type: STORY_MYSTORIES_LIST_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get('/api/stories/author/mystories',{
      headers:{
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: STORY_MYSTORIES_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.message.data
        : err.message;
    console.log(message);
    dispatch({ type: STORY_MYSTORIES_LIST_ERROR, payload: message });
  }
};


export const createStory = (story) => async (dispatch, getState) => {
  dispatch({ type: STORY_CREATE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(`/api/stories`, story, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: STORY_CREATE_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: STORY_CREATE_ERROR, payload: message });
  }
};

export const editStory = (storyEdit,storyId) => async (dispatch, getState) => {
  dispatch({ type: STORY_UPDATE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.put(`/api/stories/${storyId}`, storyEdit, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: STORY_UPDATE_SUCCESS, payload: data });
   
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      console.log(err.response);
    dispatch({ type: STORY_UPDATE_ERROR, payload: message });
  }
};

export const deleteStory = (storyId) => async (dispatch, getState) => {
  dispatch({ type: STORY_DELETE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/stories/${storyId}`,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: STORY_DELETE_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: STORY_DELETE_ERROR, payload: message });
  }
};



