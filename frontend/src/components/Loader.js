import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Spinner
      animation="grow"
      role="status"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
        color: "#bc9105"
      }}
    />
  );
}

export default Loader;
