import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListmyStories } from "../../redux/actions/storyAction";
import Story from "../StoryComponents/Story";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function MyStoriesScreen() {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const mystoriesList = useSelector((state) => state.mystoriesList);

  const { loading, error, mystories } = mystoriesList;

  useEffect(() => {
    dispatch(ListmyStories());
  }, [dispatch]);

  return (
    <div className="author-stories-box">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
          {mystories ? (
            mystories.length === 0 ? (
              <MessageBox variant="info">{`You don't have any stories  `}</MessageBox>
            ) : (
              mystories.map((s) => (
                <Story story={s} key={s._id} userInfo={userInfo} />
              ))
            )
          ) : null}
        </div>
      )}
    </div>
  );
}

export default MyStoriesScreen;
