import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const authContext = createContext();

export const useAuth = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  const [authed, setAuthed] = useState(currentUser ? true : false);
  const [adminAuthed, setadminAuthed] = useState(
    currentUser && currentUser.isAdmin ? true : false
  );

  useEffect(() => {
    setAuthed(currentUser ? true : false);
    setadminAuthed(currentUser && currentUser.isAdmin ? true : false);
  }, [currentUser]);

  return {
    authed,
    adminAuthed,
  };
};

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}

export function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();
  console.log(location.pathname)

  return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
}

export function RequireAdminAuth({ children }) {
  const { adminAuthed } = useAuth();
  const location = useLocation();

  return adminAuthed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
