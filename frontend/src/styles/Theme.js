import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#b8b8b8",
      main: "#4f4f4f",
    },
    secondary: {
      main: "#bc9105",
    },
    white: {
        main: "#ffffff",
    },
  },
  typography: {
    "fontFamily": `"Poppins", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 200,
    "fontWeightRegular": 300,
    "fontWeightMedium": 500
   }
});

export default theme;
