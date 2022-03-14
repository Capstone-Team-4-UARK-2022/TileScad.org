import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../public/android-chrome-192x192.png";

function BarNav() {
  return (
    <div className="Navigation">
      <Navbar
        // bg="light"
        variant="light"
        sticky="top"
        expand="sm"
        collapseOnSelect
        style={{ padding: "10px 20px", borderBottom: "1px solid gray" }}
      >
        <Navbar.Brand>
          <img src={logo} width="40px" height="40px" /> TileScad
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="design">Design</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default BarNav;
