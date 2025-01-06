import React, { Component } from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} style={{ width: "40%", height: "300px" }} alt="...." />
    </div>
  );
};

export default Spinner;
