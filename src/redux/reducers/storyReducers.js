import {
  STORY_AUTHOR_LIST_ERROR,
  STORY_AUTHOR_LIST_REQUEST,
  STORY_AUTHOR_LIST_SUCCESS,
  STORY_CREATE_ERROR,
  STORY_CREATE_REQUEST,
  STORY_CREATE_RESET,
  STORY_CREATE_SUCCESS,
  STORY_DELETE_ERROR,
  STORY_DELETE_REQUEST,
  STORY_DELETE_RESET,
  STORY_DELETE_SUCCESS,
  STORY_DETAIL_ERROR,
  STORY_DETAIL_REQUEST,
  STORY_DETAIL_SUCCESS,
  STORY_DETAIL_RESET,
  STORY_LIST_ERROR,
  STORY_LIST_REQUEST,
  STORY_LIST_SUCCESS,
  STORY_UPDATE_ERROR,
  STORY_UPDATE_REQUEST,
  STORY_UPDATE_RESET,
  STORY_UPDATE_SUCCESS,
  STORY_MYSTORIES_LIST_REQUEST,
  STORY_MYSTORIES_LIST_SUCCESS,
  STORY_MYSTORIES_LIST_ERROR,
} from "../actionConstants/storyConstants";

export const storyListReducer = (
  state = {
    // loading: true,
    // stories: [],
  },
  action
) => {
  switch (action.type) {
    case STORY_LIST_REQUEST:
      return { ...state, loading: true };

    case STORY_LIST_SUCCESS:
      return { ...state, loading: false, stories: action.payload };

    case STORY_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const storyDetailReducer = (
  state = { loading: false, story: {}, error: null },
  action
) => {
  switch (action.type) {
    case STORY_DETAIL_REQUEST:
      return { ...state, loading: true };

    case STORY_DETAIL_SUCCESS:
      return { ...state, loading: false, story: action.payload };

    case STORY_DETAIL_ERROR:
      return { ...state, loading: false, error: action.payload };

    case STORY_DETAIL_RESET:
      return { loading: false, story: {}, error: null };

    default:
      return state;
  }
};

export const storyAuthorListReducer = (
  state = {
    loading: false,
    stories: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case STORY_AUTHOR_LIST_REQUEST:
      return { ...state, loading: true };

    case STORY_AUTHOR_LIST_SUCCESS:
      return { ...state, loading: false, stories: action.payload };

    case STORY_AUTHOR_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const myStoriesAuthorListReducer = (
  state = {
    loading: false,
    mystories: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case STORY_MYSTORIES_LIST_REQUEST:
      return { ...state, loading: true };

    case STORY_MYSTORIES_LIST_SUCCESS:
      return { ...state, loading: false, mystories: action.payload };

    case STORY_MYSTORIES_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};


export const storyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STORY_CREATE_REQUEST:
      return { loading: true };

    case STORY_CREATE_SUCCESS:
      return { loading: false, story: action.payload };

    case STORY_CREATE_ERROR:
      return { loading: false, error: action.payload };

    case STORY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const storyEditReducer = (state = {}, action) => {
  switch (action.type) {
    case STORY_UPDATE_REQUEST:
      return { loading: true };

    case STORY_UPDATE_SUCCESS:
      return { loading: false, storyEdited: action.payload };

    case STORY_UPDATE_ERROR:
      return { loading: false, error: action.payload };

    case STORY_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const storyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STORY_DELETE_REQUEST:
      return { loading: true };

    case STORY_DELETE_SUCCESS:
      return { loading: false, deletedStory: action.payload };

    case STORY_DELETE_ERROR:
      return { loading: false, error: action.payload };

    case STORY_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
