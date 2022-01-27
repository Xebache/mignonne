import React from "react";

import Box from "@mui/material/Box";
import { BlackCard } from "../components/customMaterials/Card";

import LoginForm from "../components/user/LoginForm";


const LoginScreen = () => {
  return (
    <Box
      component="span"
      sx={{ display: "flex", justifyContent: "center", marginLeft: "2vh", marginRight: "2vh" }}
    >
      <BlackCard sx={{ maxWidth: "34.4em" }}>
        <h1
          className="mb-3 text-center"
          style={{ fontWeight: "300", fontSize: "2rem" }}
        >
          Identifiez-vous
        </h1>
        <LoginForm/>
      </BlackCard>
    </Box>
  );
};

export default LoginScreen;
