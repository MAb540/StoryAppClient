import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import {
  storyListReducer,
  storyDetailReducer,
  storyAuthorListReducer,
  storyCreateReducer,
  storyDeleteReducer,
  storyEditReducer,
  myStoriesAuthorListReducer,
} from "./redux/reducers/storyReducers";

import thunk from "redux-thunk";
import {
  authorInfoReducer,
  authorListReducer,
  updateAuthorProfileReducer,
  userRegisterReducer,
  userSignReducer,
} from "./redux/reducers/userReducers";
import { commentCreateReducer, commentDeleteReducer, commentListReducer, commentUpdateReducer } from "./redux/reducers/commentReducers";

const initState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const rootReducer = combineReducers({
  storyList: storyListReducer,
  storyDetails: storyDetailReducer,
  storyAuthorList: storyAuthorListReducer,
  mystoriesList:myStoriesAuthorListReducer,

  storyCreate: storyCreateReducer,
  storyEdit: storyEditReducer,
  storyDelete: storyDeleteReducer,
  authorInfo: authorInfoReducer,
  authorUpdateProfile: updateAuthorProfileReducer,
  authorList: authorListReducer,
  userSignin: userSignReducer,
  userRegister: userRegisterReducer,
  commentCreate:commentCreateReducer,
  commentList:commentListReducer,
  commentDelete:commentDeleteReducer,
  commentUpdate:commentUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
