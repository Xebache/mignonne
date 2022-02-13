import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth, RequireAdminAuth } from "../authentication/useAuth";

import { useDispatch, useSelector } from "react-redux";
import { login, userProfile } from "../actions/userActions";

import { useCookies } from "react-cookie";

import { withCookies } from "react-cookie";

import HomeScreen from "../screens/HomeScreen";
import Error404Screen from "../screens/Error404Screen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ShopProductScreen from "../screens/ShopProductScreen";
import ShopMainScreen from "../screens/ShopMainScreen";

import CartScreen from "../screens/CartScreen";

import AdminFiltersScreen from "../screens/AdminFiltersScreen";
import AdminProductFormScreen from "../screens/AdminProductFormScreen";
import AdminProductListScreen from "../screens/AdminProductListScreen";
import AdminOrderListScreen from "../screens/AdminOrderListScreen";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/password" element={<PasswordRecoveryScreen />} />
      <Route path="/admin/products" element={<RequireAdminAuth><AdminProductListScreen /></RequireAdminAuth>} />
      <Route path="/admin/products/create" element={<RequireAdminAuth><AdminProductFormScreen /></RequireAdminAuth>} />
      <Route path="/admin/products/update/:id" element={<RequireAdminAuth><AdminProductFormScreen /></RequireAdminAuth>} />
      <Route path="/admin/filters" element={<RequireAdminAuth><AdminFiltersScreen /></RequireAdminAuth>} />
      <Route path="/admin/orders" element={<RequireAdminAuth><AdminOrderListScreen /></RequireAdminAuth>} />
      <Route path="/profile" element={<RequireAuth><ProfileScreen /></RequireAuth>} />
      <Route path="/product/:id" element={<ShopProductScreen />} />
      <Route path="/shop" element={<ShopMainScreen />} />
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
