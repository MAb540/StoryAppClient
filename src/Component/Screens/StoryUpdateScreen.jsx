import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  STORY_DETAIL_RESET,
  STORY_UPDATE_RESET,
} from "../../redux/actionConstants/storyConstants";
import { detailsStory, editStory } from "../../redux/actions/storyAction";
import ProfileUpperbox from "../StoryComponents/ProfileUpperbox";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";

function StoryUpdateScreen(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStoryStatus] = useState("");
  const [storyBgImage, setStoryBgImage] = useState("");
  const [imageName, setImageName] = useState("");

  const storyId = props.match.params.storyId;

  const dispatch = useDispatch();
  const storyDetails = useSelector((state) => state.storyDetails);
  const { error, loading, story } = storyDetails;

  const storyEdit = useSelector((state) => state.storyEdit);
  const { error: errorEdit, loading: loadingEdit, storyEdited } = storyEdit;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const updateFormRef = useRef();

  useEffect(() => {
    dispatch(detailsStory(storyId));
  }, [dispatch, storyId]);

  useEffect(() => {
    if (Object.entries(story).length !== 0) {
      setTitle(story.title);
      setBody(story.body);
      setStoryStatus(story.status);
      setImageName(story.backgroundImageUrl);
    }
  }, [story]);

  useEffect(() => {
    if (storyEdited) {
      setTimeout(() => {
        dispatch({ type: STORY_DETAIL_RESET });
        dispatch({ type: STORY_UPDATE_RESET });
        props.history.push("/mystories");
      }, 1000);
    }
  }, [dispatch, props.history, storyEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let editFormData = new FormData(updateFormRef.current);
    dispatch(editStory(editFormData, storyId));
    e.target.reset();
  };

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="author-box">
          <React.Fragment>
            <ProfileUpperbox
              username={userInfo.username}
              email={userInfo.email}
              profileImage={userInfo.profileImage}
            >
              {"Edit Story"}
            </ProfileUpperbox>

            <form onSubmit={handleSubmit} ref={updateFormRef}>
              {loadingEdit && <LoadingBox></LoadingBox>}
              {errorEdit && (
                <MessageBox variant="danger">{errorEdit}</MessageBox>
              )}
              {storyEdited && (
                <MessageBox variant="success">
                  Story Updated Successfully
                </MessageBox>
              )}

              <div className="story-wrap-input">
                <input
                  className="story-input-100"
                  type="text"
                  name="title"
                  placeholder="title"
                  required
                  minLength={3}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="story-wrap-input">
                <textarea
                  className="story-input-100 story-input-textarea"
                  name="body"
                  placeholder="body"
                  required
                  minLength="3"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>

              <div className="story-wrap-input">
                <h3>Status</h3>

                <input
                  className="story-radio"
                  name="status"
                  type="radio"
                  value="public"
                  checked={status === "public"}
                  onChange={(e) => setStoryStatus(e.target.value)}
                />
                <label>Public</label>

                <input
                  className="story-radio"
                  name="status"
                  type="radio"
                  value="private"
                  checked={status === "private"}
                  onChange={(e) => setStoryStatus(e.target.value)}
                />
                <label>Private</label>
              </div>

              <div className="story-wrap-input">
                <label>
                  {imageName === undefined ? imageName : imageName.slice(-31)}
                </label>
                {"  "}
                <input
                  type="file"
                  name="storyBgImage"
                  onChange={(e) => {
                    setStoryBgImage(e.target.files[0]);
                    setImageName(storyBgImage.name);
                  }}
                />
              </div>

              <div className="story-wrap-input">
                <button className="story-submit-btn" type="submit">
                  Update
                </button>
              </div>
            </form>
          </React.Fragment>
        </div>
      )}
    </div>
  );
}

export default StoryUpdateScreen;
