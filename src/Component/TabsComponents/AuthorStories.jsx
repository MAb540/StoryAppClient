import React, { Fragment, useEffect } from "react";

import Story from "../StoryComponents/Story";

import { useSelector, useDispatch } from "react-redux";
import { authorListStories } from "../../redux/actions/storyAction";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function AuthorStories(props) {
  const dispatch = useDispatch();
  const storyAuthorList = useSelector((state) => state.storyAuthorList);

  const { loading, error, stories } = storyAuthorList;

  useEffect(() => {
    dispatch(authorListStories(props.authorId));
  }, [dispatch, props.authorId]);

  return (
    <div className="author-stories-box">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
          {stories.length === 0 ? (
            <MessageBox variant="danger">{"No Stories"}</MessageBox>
          ) : (
            stories.map((s) => <Story story={s} key={s._id} />)
          )}
        </div>
      )}
    </div>
  );
}

export default AuthorStories;

// stories &&  stories.length === 0 ?          <MessageBox variant="danger">{'No Stories'}</MessageBox>

//             :stories.map((s) => (
//             <Story story={s} key={s._id} />
//           ))
