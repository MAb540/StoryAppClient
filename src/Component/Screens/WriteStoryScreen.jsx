import React, { useEffect, useRef, useState } from "react";
import { createStory } from "../../redux/actions/storyAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import { STORY_CREATE_RESET } from "../../redux/actionConstants/storyConstants";
import "./writeStoryScreen.scss";
import ProfileUpperbox from "../StoryComponents/ProfileUpperbox";

function WriteStoryScreen(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStoryStatus] = useState("public");
  const [storyBgImage, setStoryBgImage] = useState("");

  const dispatch = useDispatch();

  const storyCreate = useSelector((state) => state.storyCreate);
  const { loading, error, story } = storyCreate;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const formRef = useRef();

  useEffect(() => {
    if (story) {
      setTimeout(() => {
        dispatch({ type: STORY_CREATE_RESET });
        props.history.push("/mystories");
      }, 1000);
    }
  }, [dispatch, props.history, story]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fData = new FormData(formRef.current);

    dispatch(createStory(fData));
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="author-box">
        <React.Fragment>
          <ProfileUpperbox
            username={userInfo.username}
            email={userInfo.email}
            profileImage={userInfo.profileImage}
          >
            {"Write Story"}
          </ProfileUpperbox>

          <form onSubmit={handleSubmit} ref={formRef}>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {story && (
              <MessageBox variant="success">{story.message}</MessageBox>
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
                placeholder="body"
                name="body"
                required
                minLength={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="story-wrap-input">
              <h3>Status</h3>

              <input
                className="story-radio"
                type="radio"
                name="status"
                value="public"
                checked={status === "public"}
                onChange={(e) => setStoryStatus(e.target.value)}
              />
              <label>Public</label>

              <input
                className="story-radio"
                type="radio"
                name="status"
                value="private"
                checked={status === "private"}
                onChange={(e) => setStoryStatus(e.target.value)}
              />
              <label>Private</label>
            </div>

            <div className="story-wrap-input">
              <input
                type="file"
                name="storyBgImage"
                onChange={(e) => setStoryBgImage(e.target.files[0])}
              />
            </div>

            <div className="story-wrap-input">
              <button className="story-submit-btn" type="submit">
                Post
              </button>
            </div>
          </form>
        </React.Fragment>
      </div>
    </div>
  );
}

export default WriteStoryScreen;
