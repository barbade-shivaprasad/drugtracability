import React from "react";
import { Container } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const Instructions = () => {
  return (
    <Container maxWidth="md">
      <div className="instructionContainer">
          <div className="instructionHeading">
              INSTRUCTIONS
          </div>

          <div
          className="forms_container"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="heading" style={{ margin: "30px" }}>
            Drug tracing steps
          </div>
          <Stepper alternativeLabel>
            <Step>
              <StepLabel>Medicine Order</StepLabel>
            </Step>
            <Step>
              <StepLabel>Raw Material Supplier</StepLabel>
            </Step>
            <Step>
              <StepLabel>Manufacturer</StepLabel>
            </Step>
            <Step>
              <StepLabel>Distributor</StepLabel>
            </Step>
            <Step>
              <StepLabel>Retailer</StepLabel>
            </Step>
            <Step>
              <StepLabel>Consumer</StepLabel>
            </Step>
          </Stepper>
        </div>


          <div className="instructionBody">
              <div className="stepHeading" style={{marginTop:"50px"}}>Step 1</div>
              <div className="stepBody">Owner Should Register Raw material suppliers ,Manufacturers, Distributors and Retailers.
              (Note: Here <u>Owner</u> is the person who deployed the smart contract on the blockchain)
              </div>
              <div className="stepHeading">Step 2</div>
              <div className="stepBody">Owner should order medicines</div>
              <div className="stepHeading">Step 3</div>
              <div className="stepBody">Roles should accept deal and complete their task.(Only registered roles can take part in supply chain)</div>
              <div className="stepHeading">Step 4</div>
              <div className="stepBody">Track ordered medicines using track option</div>
          </div>
      </div>
    </Container>
  );
};


export default Instructions;
