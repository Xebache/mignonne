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

import Filters from "../filter/Filters";

const ProductToolBar = ({ selected, filter, setFilter, productsToDisplay, handleDeleteClick }) => {
  const [open, setOpen] = useState(false);

  const openFilterDialog = () => {
    setOpen(true);
  };

  return (
    <Toolbar
      sx={{
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Box>
          {selected.length > 0 ? (
            <h2
              style={{
                fontWeight: "300",
                fontSize: "1rem",
                marginTop: ".5rem",
              }}
            >
              X {selected.length}{" "}
              {selected.length === 1
                ? "produit sélectionné"
                : "produits sélectionnés"}
            </h2>
          ) : (
            <h2
              className="mb-3"
              style={{ fontWeight: "300", fontSize: "2rem" }}
            >
              Mes bijoux
            </h2>
          )}
        </Box>
        <Box>
          {selected.length > 0 ? (
            selected.length === 1 ? (
              <>
                <LinkContainer to={`/admin/products/update/${selected[0]}`}>
                  <Tooltip title="Mettre à jour">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </LinkContainer>
                <Tooltip title="Supprimer">
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Supprimer">
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )
          ) : (
            <>
              <LinkContainer to={"/admin/products/create"}>
                <Tooltip title="Ajouter">
                  <IconButton sx={{ marginBottom: "1rem" }}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </LinkContainer>
              <Tooltip title="Filtres">
                <IconButton
                  sx={{ marginBottom: "1rem" }}
                  onClick={openFilterDialog}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Filters
                filter={filter}
                setFilter={setFilter}
                productsToDisplay={productsToDisplay}
                open={open}
                close={() => setOpen(false)}
              />
            </>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
};

export default ProductToolBar;
