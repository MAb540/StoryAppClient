import React, { Fragment } from "react";
import ReactDom from "react-dom";

const MODAL_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: "4rem",
  zIndex: 1000,
  backgroundColor: "#fff",
  textAlign: "center",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7)",
  zIndex: 1000,
};

const BTN_STYLE = {
  margin: "1rem 0.3rem",
  padding: "0.6rem 0.7rem",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "center",
  textTransform: "uppercase",
  border: "1px solid #bbbbbb",
};

function Modal({ isOpen, children, handleCancel, handleDelete }) {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <Fragment>
      <div style={OVERLAY_STYLE} onClick={handleCancel}></div>
      <div style={MODAL_STYLE}>
        {children}
        <br />
        <button style={BTN_STYLE} onClick={handleDelete}>
          Delete
        </button>
        <button style={BTN_STYLE} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Fragment>,
    document.getElementById("portal")
  );
}

export default Modal;
