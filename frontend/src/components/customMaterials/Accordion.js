import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";


const AccordionSummary = styled(MuiAccordionSummary)({
  flexDirection: "row-reverse",
  padding: 0,
  marginBottom: "-1rem",
  "& .MuiAccordionSummary-expandIconWrapper": {
    width: "2rem",
    length: "2rem",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    justifyContent: "flex-end",
    // marginBottom: "-.5rem",
    paddingRight: "2rem",
  },
});

export { AccordionSummary };
