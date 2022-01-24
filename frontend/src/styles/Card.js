import { styled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import theme from "../styles/Theme";

const BlackCard = styled(Card)({
    background: theme.palette.white.main,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    padding: "1.5rem",
    boxShadow: "none"
})

const YellowCard = styled(Card)({
    background: theme.palette.white.main,
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    padding: "1.5rem",
    boxShadow: "none"
})

export { BlackCard, YellowCard }