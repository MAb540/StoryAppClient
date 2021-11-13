import React, { useEffect } from "react";
import Story from "../StoryComponents/Story";

import { useDispatch, useSelector } from "react-redux";
import { listStories } from "../../redux/actions/storyAction";

import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function StoryScreen() {
  const dispatch = useDispatch();
  const serverStories = useSelector((state) => state.storyList);

  const { loading, error, stories } = serverStories;

  useEffect(() => {
    dispatch(listStories());
  }, [dispatch]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="row">
      {stories && stories.map((s) => <Story key={s._id} story={s} />)}
    </div>
  );
}

export default StoryScreen;
