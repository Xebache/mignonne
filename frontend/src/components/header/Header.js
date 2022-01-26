import React, { useState, Fragment } from "react";

import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { LinkContainer } from "react-router-bootstrap";
import { Logo } from "../customMaterials/Logo";
import { BagIcon, OpenEyeIcon } from "../customMaterials/Icons";
import UserDialog from "./UserDialog";


const Header = () => {
  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const openUserDialog = () => {
    setOpen(true);
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container fluid className="d-flex flex-column">
          <Box className="d-flex flex-row justify-content-between w-100">
            <Box>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <Logo />
                </Navbar.Brand>
              </LinkContainer>
            </Box>
            <Box className="d-flex flex-row">
              {cartItems.length > 0 ? (
                <LinkContainer to="/cart">
                  <Nav.Link>
                  <Badge 
                    badgeContent={cartItems.length} 
                    sx={{ '& .MuiBadge-badge': {
                      right: 22,
                      top: 30,
                      background: "transparent",
                      border: "1px solid #6f6f6f",
                      color: "#6f6f6f",
                      padding: '0 4px' } }}>
                    <BagIcon color="#bc9105" />
                  </Badge>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <BagIcon color="#6f6f6f" />
                  </Nav.Link>
                </LinkContainer>
              )}
              {currentUser ? (
                <Fragment>
                  <Button
                    type="submit"
                    sx={{ "&.MuiButton-outlined": {color: "transparent", borderColor: "transparent", height: "3.5rem", marginTop: ".2rem" } }}
                    variant="outlined"
                    onClick={openUserDialog}
                  >
                    <OpenEyeIcon color="#bc9105" />
                  </Button>
                  <UserDialog open={open} onClose={() => setOpen(false)} />
                </Fragment>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <OpenEyeIcon color="#6f6f6f" />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Box>
          </Box>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
