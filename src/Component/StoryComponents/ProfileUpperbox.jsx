import React from "react";

function ProfileUpperbox({ username, email, profileImage, children }) {
  const defaultImageLink = "uploads/default.jpeg";

  return (
    <React.Fragment>
      <div className="author-box-head">
        <div className="c1">
          <img
            src={`http://localhost:5000/${
              profileImage === "" ? defaultImageLink : profileImage
            }`}
            alt="some author"
          />
        </div>
        <div className="c2">
          <h2>
            {username} <b className="batch">Author</b>
          </h2>
          <p>{email}</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">
          <h4>{children}</h4>
          <hr />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProfileUpperbox;
