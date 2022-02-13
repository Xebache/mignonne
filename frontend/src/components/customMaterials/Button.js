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

export const ButtonNoOutlinedFullWidth = ({ children, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      variant="outlined"
      fullWidth={true}
      sx={{
        "&.MuiButton-outlined": {
          border: "none",
          borderRadius: 0,
          borderTop: "1px solid #6f6f6f",
          color: "#6f6f6f",
          fontWeight: "300",
          paddingTop: "1.5em",
          paddingBottom: "1.5em",
        },
      }}
    >
      {children}
    </Button>
  );
};
