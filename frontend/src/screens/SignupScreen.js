import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { BlackCard } from "../components/customMaterials/Card";
import { MyTextField } from "../components/customMaterials/Inputs";

import Loader from "../components/customMaterials/Loader";
import Message from "../components/customMaterials/Message";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { error, loading, currentUser } = loggedUser;

  useEffect(() => {
  }, []);

  const signupHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Box component="span" sx={{ display: "flex", justifyContent: "center" }}>
      <BlackCard>
        <h1
          className="mb-3 text-center"
          style={{ fontWeight: "300", fontSize: "2rem" }}
        >
          Enregistrez-vous
        </h1>
        <CardContent>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <MyTextField
              type="text"
              id="ctlName"
              value={name}
              label="Nom"
              onChange={(e) => setName(e.target.value)}
              className="w-100"
            ></MyTextField>
            <MyTextField
              type="email"
              id="ctlEmail"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-100"
            ></MyTextField>
            <MyTextField
              type="password"
              id="ctlPassword"
              value={password}
              label="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              className="w-100"
            ></MyTextField>
            <MyTextField
              type="password"
              id="ctlConfirmPassword"
              value={confirmPassword}
              label="Confirmez le mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-100"
            ></MyTextField>
          </Box>
        </CardContent>
        <CardActions className="justify-content-center flex-column">
          <Button
            type="submit"
            sx={{
              "&.MuiButton-outlined": {
                color: "#bc9105",
                borderColor: "#bc9105",
                fontWeight: "400",
              },
            }}
            variant="outlined"
            onClick={signupHandler}
          >
            Valider
          </Button>
          <div className="mt-3" style={{ fontSize: ".75rem" }}>
            Déjà membre ?
            <Link
              style={{ textDecoration: "none", color: "#bc9105" }}
              to={"/login"}
            >
              {" "}
              Identifiez-vous
            </Link>
          </div>
        </CardActions>
      </BlackCard>
    </Box>
  );
};

export default LoginScreen;
