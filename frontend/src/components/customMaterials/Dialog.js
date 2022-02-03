import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import { BlackCard } from "./Card";
import { CloseIcon } from "./Icons";

const BlackDialog = ({ open, onClose, children }) => {
  return (
    <Dialog
      hideBackdrop
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { position: "fixed", top: 10, right: 10, m: 0, overflow: "hidden" },
      }}
    >
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <BlackCard style={{ minWidth: "20rem" }} className="p-0">
          {children}
        </BlackCard>
      </Slide>
    </Dialog>
  );
};

const LeftSlidingDialog = ({ open, onClose, children, closeDialog }) => {
  return (
    <Dialog
      hideBackdrop
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: "1vh",
          left: 10,
          m: 0,
          overflow: "hidden"
        },
      }}
    >
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <BlackCard
          style={{ minWidth: "20vw", height: "100vh" }}
          className="p-0"
        >
          <Box textAlign={"right"} marginRight={"-1rem"}>
            <Button
              type="submit"
              sx={{
                "&.MuiButton-outlined": {
                  color: "transparent",
                  borderColor: "transparent",
                  marginTop: ".25rem",
                },
              }}
              variant="outlined"
              onClick={closeDialog}
            >
              <CloseIcon />
            </Button>
          </Box>
          {children}
        </BlackCard>
      </Slide>
    </Dialog>
  );
};

export { BlackDialog, LeftSlidingDialog };
