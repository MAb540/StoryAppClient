import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  commentCreateAction,
  commentDeleteAction,
  commentEditAction,
  commentListAction,
} from "../../redux/actions/commentAction";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "../utilityComponents/Modal";

const CommentForm = (props) => {
  const { comment, setComment, boxIsOpen, setBoxIsOpen, submitHandler } = props;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { loading, error } = commentCreate;

  // form value change handler
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  // form Event handlers
  const blurHandler = (e) => {
    e.target.setAttribute("placeholder", "Add Your Comment");
  };
  const OnClickHandlerCancel = (e) => {
    setComment("");
    setBoxIsOpen(false);
  };

  const clickHandler = (e) => {
    setBoxIsOpen(true);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <textarea
        onBlur={blurHandler}
        onClick={clickHandler}
        className="padding-16 form-input"
        type="text"
        name="comment"
        placeholder="Add Your Comment"
        value={comment}
        onChange={onChangeHandler}
        required
      />
      {boxIsOpen ? (
        <div id="form-btns-div">
          <input className="form-button" type="submit" value="Comment " />
          <button
            className="form-button"
            type="button"
            id="cancel"
            onClick={OnClickHandlerCancel}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </form>
  );
};

function Comment(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { storyId } = props;

  const [editMode, setEditMode] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [boxIsOpen, setBoxIsOpen] = useState(false);

  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commentListAction(storyId));
  }, [dispatch, storyId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!editMode) {
      dispatch(commentCreateAction({ storyId, commentBody: comment }));
    } else {
      const updatedComment = { storyId, commentBody: comment };
      dispatch(commentEditAction(commentId, updatedComment));
      setEditMode(false);
    }

    setTimeout(() => {
      dispatch(commentListAction(storyId));
    }, 1000);

    setComment("");
    setBoxIsOpen(false);
  };

  const handleUpdate = (commentId) => {
    const selectedComment = comments.find((c) => c._id === commentId);

    setCommentId(selectedComment._id);
    setComment(selectedComment.commentBody);
    setEditMode(true);
    setBoxIsOpen(true);
  };

  return (
    <div className="box-comment">
      {userSignin.userInfo && (
        <CommentForm
          storyId={storyId}
          comment={comment}
          setComment={setComment}
          boxIsOpen={boxIsOpen}
          setBoxIsOpen={setBoxIsOpen}
          submitHandler={submitHandler}
        />
      )}

      <section className="padding-16">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentLi
                  key={comment._id}
                  comment={comment}
                  storyId={storyId}
                  handleUpdate={handleUpdate}
                />
              ))
            ) : (
              <MessageBox variant="info">No Comments</MessageBox>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

const CommentLi = (props) => {
  const { comment, storyId, handleUpdate } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(commentDeleteAction(comment._id));
    setIsOpen(false);

    setTimeout(() => {
      dispatch(commentListAction(storyId));
    }, 1000);
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <li>
      <div className="comment-img">
        <img
          src={`http://localhost:5000/${comment.authorId.profileImage}`}
          alt="Author"
        />
      </div>
      <div className="comment-content">
        <h4>
          <Link to={`/author/${comment.authorId._id}`}>
            <b>{comment.authorId.username}</b>
          </Link>
        </h4>
        <p>{comment.commentBody}</p>
      </div>
      {userInfo ? (
        <div className="comment-icons">
          {userInfo._id === comment.authorId._id ? (
            <Fragment>
              <MdDelete size="1.1em" onClick={() => setIsOpen(true)} />
              <Modal
                isOpen={isOpen}
                handleCancel={() => setIsOpen(false)}
                handleDelete={handleDelete}
              >
                Are you sure you want to delete it?
              </Modal>
              <MdEdit size="1.1em" onClick={() => handleUpdate(comment._id)} />
            </Fragment>
          ) : null}
        </div>
      ) : null}
    </li>
  );
};

export default Comment;
