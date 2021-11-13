import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTHOR_UPDATE_PROFILE_RESET } from "../../redux/actionConstants/userConstants";
import {
  authorInformation,
  updateAuthorProfile,
} from "../../redux/actions/userAction";
import ProfileUpperbox from "../StoryComponents/ProfileUpperbox";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import "./profile.scss";

function Profile() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [facebookAddress, setFacebookAddress] = useState("");
  const [twitterAddress, setTwitterAddress] = useState("");
  const [instagramAddress, setInstagramAddress] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [imageName, setImageName] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const authorInfo = useSelector((state) => state.authorInfo);
  const { loading, error, authorBio } = authorInfo;

  const authorUpdateProfile = useSelector((state) => state.authorUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = authorUpdateProfile;

  const profileRef = useRef();

  useEffect(() => {
    dispatch(authorInformation(userInfo._id));
    // eslint-disable-next-line no-sparse-arrays
  }, [dispatch, userInfo._id]);

  useEffect(() => {
    if (authorBio !== undefined) {
      setUsername(authorBio.username);
      setEmail(authorBio.email);
      setAbout(authorBio.about);
      setFacebookAddress(authorBio.facebookAddress);
      setTwitterAddress(authorBio.twitterAddress);
      setInstagramAddress(authorBio.instagramAddress);
      setImageName(authorBio.profileImage);
    }
  }, [authorBio]);

  useEffect(() => {
    if (successUpdate) {
      setTimeout(() => {
        dispatch({ type: AUTHOR_UPDATE_PROFILE_RESET });
      }, 4000);
    }
  }, [dispatch, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = new FormData(profileRef.current);

    dispatch(updateAuthorProfile(profileData));
  };

  return (
    <div className="container">
      <div className="author-box">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <React.Fragment>
            <ProfileUpperbox
              username={username}
              email={email}
              profileImage={imageName}
            >
              {"Profile Info"}
            </ProfileUpperbox>

            <form onSubmit={handleSubmit} ref={profileRef}>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <div className="profile-wrap-input">
                <input
                  className="profile-input-100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="profile-wrap-input">
                <input
                  className="profile-input-100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-wrap-input">
                <textarea
                  className="profile-input-100 profile-input-textarea"
                  name="about"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="profile-wrap-input">
                <input
                  className="profile-input-100"
                  name="facebookAddress"
                  type="text"
                  placeholder="facebookAddress"
                  value={facebookAddress}
                  onChange={(e) => setFacebookAddress(e.target.value)}
                />
              </div>

              <div className="profile-wrap-input">
                <input
                  className="profile-input-100"
                  name="twitterAddress"
                  type="text"
                  placeholder="twitterAddress"
                  value={twitterAddress}
                  onChange={(e) => setTwitterAddress(e.target.value)}
                />
              </div>

              <div className="profile-wrap-input">
                <input
                  className="profile-input-100"
                  name="instagramAddress"
                  type="text"
                  placeholder="instagramAddress"
                  value={instagramAddress}
                  onChange={(e) => setInstagramAddress(e.target.value)}
                />
              </div>
              <div className="profile-wrap-input">
                <label>
                  {imageName === undefined ? imageName : imageName.slice(-30)}
                </label>
                {"  "}
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => {
                    setprofileImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="profile-wrap-input">
                <button className="profile-submit-btn" type="submit">
                  Update
                </button>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Profile;
