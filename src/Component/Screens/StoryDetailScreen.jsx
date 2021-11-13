import React, { useEffect } from "react";
import { detailsStory } from "../../redux/actions/storyAction";
import { useSelector, useDispatch } from "react-redux";
import "./storyDetailScreen.scss";

import Comment from "../StoryComponents/Comment";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function StoryDetailScreen(props) {
  const storyId = props.match.params.id;
  const dispatch = useDispatch();

  const storyDetails = useSelector((state) => state.storyDetails);

  const { error, loading, story } = storyDetails;
  const { title, backgroundImageUrl } = story;

  useEffect(() => {
    dispatch(detailsStory(storyId));
  }, [dispatch, storyId]);

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        story && (
          <div class="box">
            <div className="img-box">
              <img
                src={`http://localhost:5000/${backgroundImageUrl}`}
                width="100%"
                alt=""
              />
            </div>

            <div className="box-content">
              <h3>
                <b>{title}</b>
              </h3>

              <p>{story.body}</p>
            </div>

            <hr />

            <Comment storyId={storyId} />
          </div>
        )
      )}
    </div>
  );
}

export default StoryDetailScreen;
