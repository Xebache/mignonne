import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";

import { AccordionSummary } from "../components/customMaterials/Accordion";
import { BlackCard } from "../components/customMaterials/Card";
import { ArrowIcon } from "../components/customMaterials/Icons";

import ProfileForm from "../components/user/ProfileForm";
import AddressForm from "../components/user/AddressForm";

const ProfileScreen = () => {
  const collapsedIcon = (
    <ArrowIcon color="#6f6f6f" style={{ width: "1rem", length: "1rem" }} />
  );
  const expandedIcon = (
    <ArrowIcon color="#bc9105" style={{ width: "1rem", length: "1rem" }} />
  );
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Container>
        <BlackCard className="mb-3">
          <Accordion
            sx={{ boxShadow: "none" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={expanded === "panel1" ? expandedIcon : collapsedIcon}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h2
                className="mb-3 text-center"
                style={{ fontWeight: "300", fontSize: "2rem" }}
              >
                Mon profil
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <ProfileForm />
            </AccordionDetails>
          </Accordion>
        </BlackCard>
        <BlackCard className="mb-3">
        <Accordion
          sx={{ boxShadow: "none" }}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={expanded === "panel2" ? expandedIcon : collapsedIcon}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <h2
              className="mb-3 text-center"
              style={{ fontWeight: "300", fontSize: "2rem" }}
            >
              Mes commandes
            </h2>
          </AccordionSummary>
        </Accordion>
        </BlackCard>
        <BlackCard>
          <Accordion
            sx={{ boxShadow: "none" }}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={expanded === "panel3" ? expandedIcon : collapsedIcon}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <h2
                className="mb-3 text-center"
                style={{ fontWeight: "300", fontSize: "2rem" }}
              >
                Mes adresses
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <AddressForm />
            </AccordionDetails>
          </Accordion>
        </BlackCard>
      </Container>
    </>
  );
};

export default ProfileScreen;
