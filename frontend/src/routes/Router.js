import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth, RequireAdminAuth } from "../authentication/useAuth";

import { useDispatch, useSelector } from "react-redux";
import { login, userProfile } from "../actions/userActions";

import { useCookies } from "react-cookie";

import { withCookies } from "react-cookie";

import CartScreen from "../screens/CartScreen";
import Error404Screen from "../screens/Error404Screen";
import FiltersEditScreen from "../screens/FiltersEditScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderListScreen from "../screens/OrderListScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import SignupScreen from "../screens/SignupScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";

import ProductEditScreen from "../screens/ProductEditScreen";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/password" element={<PasswordRecoveryScreen />} />
      <Route path="/admin/products" element={<RequireAdminAuth><ProductListScreen /></RequireAdminAuth>} />
      <Route path="/admin/products/create" element={<RequireAdminAuth><ProductEditScreen /></RequireAdminAuth>} />
      <Route path="/admin/products/update/:id" element={<RequireAdminAuth><ProductEditScreen /></RequireAdminAuth>} />
      <Route path="/admin/filters" element={<RequireAdminAuth><FiltersEditScreen /></RequireAdminAuth>} />
      <Route path="/admin/orders" element={<RequireAdminAuth><OrderListScreen /></RequireAdminAuth>} />
      <Route path="/profile" element={<RequireAuth><ProfileScreen /></RequireAuth>} />
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

export default Router;
