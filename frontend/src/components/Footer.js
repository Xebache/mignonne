import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer style={{ fontSize: ".65rem" }}>
      <Container className="py-5 text-center">
        <span className="text-nowrap mx-1">
          <Link
            to={`/privacy-policy`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Privacy Policy
          </Link>
        </span>
        <span style={{ fontSize: ".5rem", opacity: "0.5" }}> &#9670; </span>
        <span className="text-nowrap mx-1">
          <Link
            to={`/terms-and-conditions`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Terms and Conditions
          </Link>
        </span>
        <span style={{ fontSize: ".5rem", opacity: "0.5" }}> &#9670; </span>
        <span className="text-nowrap mx-1">&copy; Copyright 2022 Mignonne</span>
      </Container>
    </footer>
  );
}

export default Footer;
