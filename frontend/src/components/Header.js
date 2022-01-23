import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { LinkContainer } from "react-router-bootstrap";
import { Logo } from "./Logo";
import { BagIcon, UserIcon } from "./Icons";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container fluid className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between w-100">
            <div>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <Logo />
                </Navbar.Brand>
              </LinkContainer>
            </div>
            <div className="d-flex flex-row">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <BagIcon />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <UserIcon />
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>
          {/* <div className="d-flex flex-row justify-content-center w-100">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>
            </Navbar.Collapse>
          </div> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
