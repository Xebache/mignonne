import React from "react";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { BlackDialog } from "../customMaterials/Dialog";
import { CloseIcon } from "../customMaterials/Icons"

const UserDialog = ({ open, onClose, user }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toProfileHandler = () => {
    navigate("/profile")
    onClose();
  }

  const logoutHandler = () => {
    dispatch(logout());
    onClose();
  }

  return (
    <BlackDialog open={open} onClose={onClose}>
      <List>
        <ListItem>
          <Button
            style={{ marginLeft: "-1rem", marginTop: ".1rem" }}
            type="submit"
            sx={{
              "&.MuiButton-outlined": {
                color: "transparent",
                borderColor: "transparent",
                marginTop: "-.25rem",
              },
            }}
            variant="outlined"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
          <ListItemText primary={user.name} />
        </ListItem>
        <ListItem>
          <Button
            className="w-100"
            variant="outlined"
            sx={{"&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
            onClick={toProfileHandler}
          >
            Mon profil
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="w-100"
            variant="outlined"
            sx={{"&.MuiButton-outlined": { color: "#bc9105", borderColor: "#bc9105", fontWeight: "400" } }}
            onClick={logoutHandler}
          >
            Se déconnecter
          </Button>
        </ListItem>
      </List>
    </BlackDialog>
  );
};

export default UserDialog;
