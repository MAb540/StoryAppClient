import axios from "axios";
import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
} from "../actionConstants/commentConstants";

export const commentCreateAction = (comment) => async (dispatch, getState) => {
  dispatch({ type: COMMENT_CREATE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post("/api/comments", comment, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: COMMENT_CREATE_FAIL, payload: message });
  }
};

export const commentListAction = (storyId) => async (dispatch, getState) => {
  dispatch({ type: COMMENT_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/comments/story/${storyId}`);

    dispatch({ type: COMMENT_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: COMMENT_LIST_FAIL, payload: message });
  }
};

export const commentDeleteAction = (commentId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: COMMENT_DELETE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.delete(`/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: COMMENT_DELETE_FAIL, payload: message });
  }
};

export const commentEditAction = (commentId,commentUpdate)=> async (dispatch,getState)=>{

  dispatch({type:COMMENT_UPDATE_REQUEST})

  const {userSignin:{userInfo}} = getState();

  try{

    const {data} = await axios.put(`/api/comments/${commentId}`,commentUpdate,{
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
    })
    dispatch({type: COMMENT_UPDATE_SUCCESS, payload:data})

  }catch(err){
    const message =
    err.response && err.response.data.message
      ? err.response.data.message
      : err.message;
    dispatch({ type: COMMENT_UPDATE_FAIL, payload: message });
  }

}

