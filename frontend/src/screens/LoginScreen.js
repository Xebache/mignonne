import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { BlackCard } from "../components/customMaterials/Card";
import Loader from "../components/customMaterials/Loader";
import Message from "../components/customMaterials/Message";
import LoginForm from "../components/user/LoginForm";


const LoginScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, currentUser } = userLogin;

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (currentUser) navigate(redirect);
  }, [currentUser, navigate, redirect])

  return (
    <Box
      component="span"
      sx={{ display: "flex", justifyContent: "center", marginLeft: "2vh", marginRight: "2vh" }}
    >
      <BlackCard sx={{ maxWidth: "34.4em" }}>
        <h2
          className="mb-3 text-center"
          style={{ fontWeight: "300", fontSize: "2rem" }}
        >
          Identifiez-vous
        </h2>
        <CardContent>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <LoginForm/>
        </CardContent>
        <CardActions className="justify-content-center flex-column" style={{marginTop: "-1rem"}}>
          <Box className="mt-3" style={{ fontSize: ".85rem" }}>
            <Link
              style={{ textDecoration: "none", color: "#bc9105" }}
              to={redirect ? `/password?redirect=${redirect}` : "/password"}
            >
              {" "}
              Mot de passe oublié ?
            </Link>
          </Box>
          <Box className="mt-3" style={{ fontSize: ".75rem" }}>
            Pas encore membre ?
            <Link
              style={{ textDecoration: "none", color: "#bc9105" }}
              to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
            >
              {" "}
              Identifiez-vous
            </Link>
          </Box>
        </CardActions>
      </BlackCard>
    </Box>
  );
};

export default LoginScreen;
