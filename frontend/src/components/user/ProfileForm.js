import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";

import Loader from "../customMaterials/Loader";
import Message from "../customMaterials/Message";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import { ButtonOutlinedYellow } from "../customMaterials/Button";
import { TransparentCard } from "../customMaterials/Card";
import { MyTextField } from "../customMaterials/Inputs";
import { CustomInput } from "../customMaterials/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { error, loading, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape(
    {
      email: Yup.string()
        .email("Adresse électronique invalide")
        .required("Champ requis"),
      firstname: Yup.string(),
      password: Yup.string()
        .notRequired()
        .when("password", {
          is: (val) => val?.length,
          then: (rule) =>
            rule.matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
              "Le mot de passe doit comporter de 8 à 20 caractères, une majuscule, une minuscule, un caractère spécial et pas d'espace"
            ),
        }),
      confirmPassword: Yup.string()
        .when("password", {
          is: (password) => password,
          then: Yup.string().required("Champ requis"),
          otherwise: Yup.string(),
        })
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe ne correspondent pas"
        ),
    },
    [
      // !!! Add Cyclic deps here because when require itself
      ["password", "password"],
    ]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: { firstname: "", email: "", password: "", confirm: "" },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!currentUser) navigate("/login");
    else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserProfile("profile"));
    }
  }, [currentUser, user, navigate, dispatch, success]);

  useEffect(() => {
    console.log("reset", user);
    reset({ ...{ firstname: user.firstname, email: user.email } });
  }, [user, reset]);

  const updateUserHandler = (data) => {
    dispatch(
      updateUserProfile({
        email: data.email,
        name: data.firstname,
        password: data.password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(updateUserHandler)}>
      <TransparentCard>
        <CardContent px={3} py={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <CustomInput
                control={control}
                type="text"
                name="firstname"
                label="Prénom + Nom"
                errors={errors}
                required={false}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomInput
                control={control}
                type="email"
                name="email"
                label="Email"
                errors={errors}
                required={false}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyTextField
                fullWidth
                margin="dense"
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
        </CardContent>
        <CardActions className="justify-content-center flex-column">
          <ButtonOutlinedYellow>Mettre à jour</ButtonOutlinedYellow>
        </CardActions>
      </TransparentCard>
    </form>
  );
};

export default ProfileForm;
