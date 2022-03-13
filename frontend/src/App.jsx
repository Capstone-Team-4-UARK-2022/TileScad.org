import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./pages/BarNav";

export default () => {
  return (
    <div className="App">
      <Navigation />
      <div className="content">This is a content.</div>
    </div>
  );
};
