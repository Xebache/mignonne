import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from '@mui/material/Slide';
import { BlackCard } from "./Card";

const BlackDialog = ({ open, onClose, children }) => {
  return (
    <Dialog
      hideBackdrop
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { position: "fixed", top: 10, right: 10, m: 0, overflow: "hidden" } }}
    >
      <Slide 
        direction="left" 
        in={open} 
        mountOnEnter 
        unmountOnExit
      >
        <BlackCard 
          style={{minWidth: "20rem"}} 
          className="p-0" 
        >
          {children}
        </BlackCard>
      </Slide>
    </Dialog>
  );
};

const BlackFilterDialog = ({ open, onClose, children }) => {
  return (
    <Dialog
      hideBackdrop
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { position: "fixed", top: "1vh", left: 10, m: 0, overflow: "hidden" } }}
    >
      <Slide 
        direction="right" 
        in={open} 
        mountOnEnter 
        unmountOnExit
      >
        <BlackCard 
          style={{minWidth: "20rem", height: "100vh"}} 
          className="p-0" 
        >
          {children}
        </BlackCard>
      </Slide>
    </Dialog>
  );
};

export { BlackDialog, BlackFilterDialog };
