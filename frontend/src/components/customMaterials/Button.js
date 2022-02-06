import Button from "@mui/material/Button";

export const ButtonOutlinedYellow = ({ children }) => {
  return (
    <Button
      type="submit"
      variant="outlined"
      sx={{
        "&.MuiButton-outlined": {
          color: "#bc9105",
          borderColor: "#bc9105",
          fontWeight: "400",
        },
      }}
    >
      {children}
    </Button>
  );
};
