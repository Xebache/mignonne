import { styled } from "@mui/material/styles";
import Button from "react-bootstrap/esm/Button";
import theme from "../styles/Theme";

const MyOutlinedButton = styled(Button)({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white.main,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '&:focus': {
        backgroundColor: theme.palette.primary.light,
        outline: "none"
      },
  });



export { MyOutlinedButton }

