import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import theme from "../styles/Theme";


const MyTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.primary.light,
          fontFamily: ["Poppins"]
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
        },
      },
    });

export { MyTextField }