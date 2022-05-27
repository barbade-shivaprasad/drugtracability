import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import toggleAlert from "./methods/Alert";

function Supply() {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  //styled table rows and styled table cells

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  

  try {
    
    if (loader) {
      document.querySelector('.loading').style.display = "block"
    }
    else
    document.querySelector('.loading').style.display = "none"
  } catch (error) {
    console.log(error)
  }


  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success','Success')
        loadBlockchaindata();
      }
    } catch (err) {
        toggleAlert('Error',"Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success','Success')
        loadBlockchaindata();
      }
    } catch (err) {
        toggleAlert('Error',"Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success','Success')
        loadBlockchaindata();
      }
    } catch (err) {
        toggleAlert('Error',"Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success','Success')
        loadBlockchaindata();
      }
    } catch (err) {
        toggleAlert('Error',"Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success','Success')
        loadBlockchaindata();
      }
    } catch (err) {
        toggleAlert('Error',"Something went Wrong, Please check instructions.");
    }
  };
  return (
    <div>
      <div className="current_account">
        <span id="caccount">Current Account : </span>
        <span style={{ fontWeight: "bold" }}>{currentaccount}</span>
      </div>
      <Container maxWidth="md" id="top">
        <div
          className="forms_container"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="heading" style={{ margin: "30px" }}>
            Flow of Supply Chain
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


<div className="roles_heading">STEP 1</div>
        <div className="forms_container" style={{marginBottom:"5rem"}}>
          <div className="heading" style={{ margin: "30px 10px" }}>
            Supply Raw Materials(Only a registered Raw Material Supplier can
            perform this step)
          </div>

          <div className="forms">
            <FormControl
              sx={{
                "& .MuiFormControl-root": {
                  margin: "10px",
                },
              }}
            >
              <div
                className="form-item"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Medicine ID"
                  variant="outlined"
                  required="true"
                    onChange={handlerChangeID}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "18px" }}
                  onClick={handlerSubmitRMSsupply}
                >
                  Supply
                </Button>
              </div>
            </FormControl>
          </div>
        </div><div className="roles_heading">STEP 2</div>
        <div className="forms_container" style={{marginBottom:"5rem"}}>
          <div className="heading" style={{ margin: "30px 10px" }}>
          Manufacture(Only a registered Manufacturer can perform this step)
          </div>

          <div className="forms">
            <FormControl
              sx={{
                "& .MuiFormControl-root": {
                  margin: "10px",
                },
              }}
            >
              <div
                className="form-item"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Medicine ID"
                  variant="outlined"
                  required="true"
                    onChange={handlerChangeID}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "18px" }}
                  onClick={handlerSubmitManufacturing}
                >
                  Manufacture
                </Button>
              </div>
            </FormControl>
          </div>
        </div><div className="roles_heading">STEP 3</div>
        <div className="forms_container" style={{marginBottom:"5rem"}}>
          <div className="heading" style={{ margin: "30px 10px" }}>
          Distribute(Only a registered Distributor can perform this step)
          </div>

          <div className="forms">
            <FormControl
              sx={{
                "& .MuiFormControl-root": {
                  margin: "10px",
                },
              }}
            >
              <div
                className="form-item"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Medicine ID"
                  variant="outlined"
                  required="true"
                    onChange={handlerChangeID}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "18px" }}
                  onClick={handlerSubmitDistribute}
                >
                  Distribute
                </Button>
              </div>
            </FormControl>
          </div>
        </div><div className="roles_heading">STEP 4</div>
        <div className="forms_container"  style={{marginBottom:"5rem"}}>
          <div className="heading" style={{ margin: "30px 10px" }}>
          Retail(Only a registered Retailer can perform this step)
          </div>

          <div className="forms">
            <FormControl
              sx={{
                "& .MuiFormControl-root": {
                  margin: "10px",
                },
              }}
            >
              <div
                className="form-item"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Medicine ID"
                  variant="outlined"
                  required="true"
                    onChange={handlerChangeID}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "18px" }}
                  onClick={handlerSubmitRetail}
                >
                  Retail
                </Button>
              </div>
            </FormControl>
          </div>
        </div><div className="roles_heading">STEP 5</div>
        <div className="forms_container" style={{marginBottom:"5rem"}}>
          <div className="heading" style={{ margin: "30px 10px" }}>
          Mark as sold(Only a registered Retailer can perform this step)
          </div>

          <div className="forms">
            <FormControl
              sx={{
                "& .MuiFormControl-root": {
                  margin: "10px",
                },
              }}
            >
              <div
                className="form-item"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  label="Medicine ID"
                  variant="outlined"
                  required="true"
                    onChange={handlerChangeID}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "18px" }}
                  onClick={handlerSubmitSold}
                >
                  Mark as sold
                </Button>
              </div>
            </FormControl>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Supply;
