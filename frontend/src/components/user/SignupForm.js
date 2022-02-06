import React from "react";

import { useDispatch } from "react-redux";
import { signup } from "../../actions/userActions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ButtonOutlinedYellow } from "../customMaterials/Button";
import { MyTextField } from "../customMaterials/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SignupForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresse électronique invalide")
      .required("Champ requis"),
    name: Yup.string().required("Champ requis"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
        "Le mot de passe doit comporter de 8 à 20 caractères, une majuscule, une minuscule, un caractère spécial et pas d'espace"
      )
      .required("champ requis"),
    confirmPassword: Yup.string()
      .required("Champ requis")
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe ne correspondent pas"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const createNewUserHandler = (data) => {
    dispatch(signup(data.name, data.email, data.password));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(createNewUserHandler)}>
      <Box px={3} py={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <MyTextField
              fullWidth
              margin="dense"
              required
              type="text"
              id="name"
              name="name"
              label="Prénom"
              {...register("name")}
              helperText={errors.name?.message}
              error={errors.name ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MyTextField
              fullWidth
              margin="dense"
              required
              type="email"
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
          <Grid item xs={12} sm={12}>
            <MyTextField
              fullWidth
              margin="dense"
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmez le mot de passe"
              autoComplete="on"
              {...register("confirmPassword")}
              helperText={errors.confirmPassword?.message}
              error={errors.confirmPassword ? true : false}
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

export default SignupForm;
