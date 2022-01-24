import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@mui/material/Button";

import { LinkContainer } from "react-router-bootstrap";
import { Logo } from "./Logo";
import { BagIcon, UserIcon, OpenEyeIcon, CloseEyeIcon } from "./Icons";

const Header = () => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const { currentUser } = loggedUser;

  const logoutHandler = () => {};

  const test = () => {
    console.log("hello");
  };

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
              {currentUser && currentUser["email"] ? (
                // <NavDropdown title={<OpenEyeIcon/>} id="username">
                //   <LinkContainer to="/profile">
                //     <NavDropdown.Item>Profil</NavDropdown.Item>
                //   </LinkContainer>
                //   <NavDropdown.Item onClick={logoutHandler}>
                //     Se déconnecter
                //   </NavDropdown.Item>
                // </NavDropdown>

                <Button
                  type="submit"
                  sx={{ "&.MuiButton-outlined": { color: "transparent", borderColor: "transparent", height: "3.5rem", marginTop: ".2rem" } }}
                  variant="outlined"
                  onClick={test}
                >
                  <OpenEyeIcon />
                </Button>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                  <OpenEyeIcon />
                  </Nav.Link>
                </LinkContainer>
              )}
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
