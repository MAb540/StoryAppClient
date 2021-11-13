import React from "react";

function LoadingBox() {
  return (
    <div style={{ margin: "4rem", padding: "5rem" }}>
      <div
        style={{
          border: "10px solid #5e9dfc",
          borderRadius: "50%",
          borderTop: "10px solid #000",
          width: "60px",
          height: "60px",
          animation: "spin 2s linear infinite",
        }}
      ></div>
    </div>
  );
}

export default LoadingBox;
