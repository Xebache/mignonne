import React, { useState } from "react";

import { LinkContainer } from "react-router-bootstrap";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";

import FilterDialog from "./FilterDialog";

import FilterForm from "../filter/FilterForm";


const FilterToolBar = ({ selected, onDeleteClick, submitHandler }) => {
  const [open, setOpen] = useState(false);

  const openFilterDialog = () => {
    setOpen(true);
  };

  return (
    <Toolbar
      sx={{
        bgcolor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
        marginBottom: ".75rem",
      }}
    >
      <FilterForm filter={selected} submitHandler={submitHandler} />
      <Tooltip title="Supprimer">
        <span>
          <IconButton
            onClick={onDeleteClick}
            disabled={selected.name === undefined}
            sx={{ marginTop: ".3rem" }}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Toolbar>
  );
};

export default FilterToolBar;
