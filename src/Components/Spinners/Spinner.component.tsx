import React from "react";
import "./Spinner.style.scss";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div id="spinner-container" className="loading">
      <span>adding savings</span>
      <div id="spinner"></div>
    </div>
  );
};

export default Spinner;
