import React from "react";

function MessageBox(props) {
  const { children } = props;
  return (
    <div className={`alert alert-${props.variant || "info"}`}>{children}</div>
  );
}

export default MessageBox;
