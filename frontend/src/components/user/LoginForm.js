import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ButtonOutlinedYellow } from "../customMaterials/Button";
import { MyTextField } from "../customMaterials/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse électronique invalide")
      .required("Champ requis"),
    password: Yup.string().required("Champ requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const loginHandler = (data) => {
    dispatch(login(data.email, data.password)).then(() =>
      navigate(state?.path || "/")
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(loginHandler)}>
      <Box px={3} py={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <MyTextField
              fullWidth
              margin="dense"
              required
              id="email"
              name="email"
              label="Email"
              {...register("email")}
              helperText={errors.email?.message}
              error={errors.email ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyTextField
              fullWidth
              margin="dense"
              required
              type="password"
              id="password"
              name="password"
              label="Mot de passe"
              autoComplete="on"
              {...register("password")}
              helperText={errors.password?.message}
              error={errors.password ? true : false}
            />
          </Grid>
        </Grid>
        <Box mt={3} textAlign={"center"}>
          <ButtonOutlinedYellow>Valider</ButtonOutlinedYellow>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
