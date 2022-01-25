import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from '@mui/material/Slide';
import { BlackCard } from "./Card";

const BlackDialog = ({ open, onClose, children }) => {

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
    });

  return (
    
    <Dialog
      hideBackdrop
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { position: "fixed", top: 10, right: 10, m: 0, overflow: "hidden" } }}
    >
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <BlackCard className="p-0" >{children}</BlackCard>
      </Slide>
    </Dialog>
  );
};

export { BlackDialog };
