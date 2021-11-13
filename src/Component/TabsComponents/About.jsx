import React from "react";

function About(props) {
  const { authorBio } = props;

  return (
    <React.Fragment>
      <div className="about-box">
        <h4>ABOUT THE AUTHOR</h4>

        <p>{authorBio.about}</p>

        <p>
          Visit <b>{authorBio.username}</b> at:
        </p>
        <p>
          Facebook:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={authorBio.facebookAddress}
          >
            {authorBio.facebookAddress.substr(0, 35)}
          </a>
        </p>
        <p>
          Twitter:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={authorBio.twitterAddress}
          >
            {authorBio.twitterAddress}
          </a>
        </p>
        <p>
          Instagram:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={authorBio.instagramAddress}
          >
            {authorBio.instagramAddress.substr(0, 35)}
          </a>
        </p>
      </div>
    </React.Fragment>
  );
}

export default About;

// {loading ? (
//   <LoadingBox />
// ) : error ? (
//   <MessageBox variant="danger">{error}</MessageBox>
// ) :
