import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "../utilityComponents/Modal";
import {
  authorListStories,
  deleteStory,
} from "../../redux/actions/storyAction";
import { useDispatch } from "react-redux";
function Story({ story, userInfo }) {
  const {
    _id,
    title,
    body,
    backgroundImageUrl,
    Author: { username, _id: authorId },
  } = story;

  const defaultImageLink = "uploads/default.jpeg";

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteStory(_id));
    console.log("story deleted");
    setIsOpen(false);

    setTimeout(() => {
      dispatch(authorListStories(authorId));
    }, 1000);
  };

  return (
    <div className="card">
      <img
        src={`http://localhost:5000/${
          backgroundImageUrl === "" ? defaultImageLink : backgroundImageUrl
        }`}
        alt="story pic"
      />
      <div className="card-body">
        <h3>
          <Link to={`author/${authorId}`}>
            <b>{username}</b>
          </Link>
        </h3>
        <h3>
          <Link to={`/story/${_id}`}>
            <p>
              {" "}
              <b>Title</b>: {title.substring(0, 10)}
            </p>
          </Link>
        </h3>
        <p>
          <b>Description: </b>
          {body.substring(0, 15)}
          <b> .....</b>
        </p>

        {userInfo && userInfo._id === authorId ? (
          <p className="align-btns">
            <MdDelete size="1.1em" onClick={() => setIsOpen(true)} />
            <Modal
              isOpen={isOpen}
              handleCancel={() => setIsOpen(false)}
              handleDelete={handleDelete}
            >
              Are you sure you want to delete it?
            </Modal>

            <Link to={`/story/update/${_id}`}>
              <MdEdit size="1.1em" />
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Story;
