import React from "react";

import "./Title.css";

function Title({ title, className }) {
  return (
    <h2 className={`subtitle ${className && `${className}`}`}>{title}</h2>
  )
}

export default Title;