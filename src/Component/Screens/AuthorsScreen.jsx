import React, { useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listAuthor } from "../../redux/actions/userAction";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import { Link } from "react-router-dom";
import "./AuthorScreen.scss";

const AuthorCard = ({ author }) => {
  const {
    _id,
    username,
    facebookAddress,
    twitterAddress,
    instagramAddress,
    profileImage,
    about,
  } = author;

  const defaultImageLink = "uploads/default.jpeg";

  return (
    <div className="author-card">
      <img
        src={`http://localhost:5000/${
          profileImage === "" ? defaultImageLink : profileImage
        }`}
        alt="story pic"
      />
      <div className="author-card-body">
        <h1>{username}</h1>

        <p class="text-grey">
          {about === undefined ? "writer" : about.substr(0, 10)}
        </p>
        <div className="icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={facebookAddress}
            className="author-card-link"
          >
            <FaFacebookF />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={twitterAddress}
            className="author-card-link"
          >
            <FaTwitter />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={instagramAddress}
            className="author-card-link"
          >
            <FaInstagram />
          </a>
        </div>

        <Link to={`/author/${_id}`}>
          {" "}
          <button>More About Author</button>
        </Link>
      </div>
    </div>
  );
};



function AuthorsScreen() {
  const dispatch = useDispatch();

  const authorList = useSelector((state) => state.authorList);

  const { loading, error, authors } = authorList;

  useEffect(() => {
    dispatch(listAuthor());
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row">
          {authors && authors.map((a) => <AuthorCard key={a._id} author={a} />)}
        </div>
      )}
    </div>
  );
}

export default AuthorsScreen;
