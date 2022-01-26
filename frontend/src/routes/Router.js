import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, userProfile } from "../actions/userActions";

import { useCookies } from "react-cookie";

import { withCookies } from "react-cookie";

import CartScreen from "../screens/CartScreen";
import Error404Screen from "../screens/Error404Screen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import SignupScreen from "../screens/SignupScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";

const Router = () => {

  const loggedUser = useSelector((state) => state.loggedUser);

const [cookies, setCookie] = useCookies();

const dispatch = useDispatch();

useEffect(() => {
  if(loggedUser["currentUser"] && !cookies["currentUser"]) 
     setCookie("currentUser", loggedUser['currentUser'])

  else if (!loggedUser["currentUser"] && cookies["currentUser"])
    console.log("TODO -> get user from token in backend !!!")
})


  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/password" element={<PasswordRecoveryScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />}>
        <Route path=":id/:qty" element={<CartScreen />} />
      </Route>
      <Route path="privacy-policy" element={<PrivacyPolicyScreen />} exact />
      <Route
        path="terms-and-conditions"
        element={<TermsAndConditionsScreen />}
        exact
      />
      <Route path="*" element={<Error404Screen />} />
    </Routes>
  );
};

export default withCookies(Router);
