import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../public/android-chrome-192x192.png";
import Navigation from "./pages/BarNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DesignPage from "../src/pages/design/Design";
import AboutPage from "../src/pages/about/About";
import UploadPage from "../src/pages/upload/Upload";

export default () => {
  return (
    <Router>
      <DesignPage />
      {/* <Routes>
        <Route path="/">
          <div className="App">
            <Navigation />
            <div className="content">This is a content.</div>
          </div>
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes> */}
    </Router>
  );
};
