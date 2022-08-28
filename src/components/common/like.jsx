import React from "react";

// Input: liked: boolean
// Output: onClick

// no need to have a class
// (because this is a stateless functional component)
const Like = (props) => {
  console.log("Like - Rendered");

  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <React.Fragment>
      <span
        onClick={props.onClick}
        className={classes}
        style={{ cursor: "pointer" }}
      ></span>
    </React.Fragment>
  );
};

export default Like;
