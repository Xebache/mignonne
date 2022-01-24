import React from "react";
import { Route, Routes } from "react-router-dom";

import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ProductScreen from "../screens/ProductScreen";
import SignupScreen from "../screens/SignupScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
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
    </Routes>
  );
};

export default Router;
