import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { Controller } from "react-hook-form";

import theme from "../../styles/Theme";

const CustomInput = ({ control, type, name, label, required, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MyTextField
          fullWidth
          margin="dense"
          required={required}
          type={type}
          id={name}
          label={label}
          helperText={errors.email?.message}
          error={errors.email ? true : false}
          {...field}
        />
      )}
    />
  );
};

const InputNumber = ({ value, setValue, min, max }) => {
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  const incrementQuantity = () => {
    setValue(value + 1);
  };

  return (
    <InputGroup>
      <Button
        disabled={value === min}
        onClick={decrementQuantity}
        variant="outline-dark"
        type="button"
        style={{ borderRight: "none" }}
      >
        &#45;
      </Button>
      <Form.Control
        disabled={true}
        className="text-center"
        style={{
          background: "transparent",
          color: "#000000",
          border: "1px solid #000000",
          borderRight: "none",
          borderLeft: "none",
        }}
        value={value}
      />
      <Button
        disabled={value === max}
        onClick={incrementQuantity}
        variant="outline-dark"
        type="button"
        style={{ borderLeft: "none" }}
      >
        &#43;
      </Button>
    </InputGroup>
  );
};

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
});

export { MyTextField, InputNumber, CustomInput };
