import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { TextField } from "@mui/material";
import { Container } from "@mui/system";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import toggleAlert from "./methods/Alert";


function AddMed() {
  const history = useHistory();
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));










  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedName, setMedName] = useState();
  const [MedDes, setMedDes] = useState();
  const [MedStage, setMedStage] = useState();

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



  
  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };
  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };
  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addMedicine(MedName, MedDes)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert('Success',"Successfully Ordered Medicine");
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
        <div className="forms_container">
          <div className="heading">Order Medicines</div>
        

        <div className="forms">
        <FormControl
          sx={{
            "& .MuiFormControl-root": {
              margin: "10px",
            },
          }}
        >
          <div className="form-item">
            <TextField
              label="Medicine Name"
              variant="outlined"
              required="true"
              onChange={handlerChangeNameMED}
            />
            <TextField
              label="Description"
              variant="outlined"
              required="true"
              onChange={handlerChangeDesMED}
            />
          </div>

          <div>
            <Button variant="contained" color="primary" sx={{margin:"10px"}}
            onClick={handlerSubmitMED}
            >
              Order
            </Button>
          </div>
        </FormControl>
      </div>
      </div>
      

      {/* <form onSubmit={handlerSubmitMED}>
                <input className="form-control-sm" type="text" onChange={handlerChangeNameMED} placeholder="Medicine Name" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeDesMED} placeholder="Medicine Description" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitMED}>Order</button>
            </form>
            <br /> */}
      {/* <h5>Ordered Medicines:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}

{!loader?<>
<div className="roles_container" id="manufacturers_section">
<div className="roles_heading">ORDERED MEDICINES</div>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">NAME</StyledTableCell>
            <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
            <StyledTableCell align="right">STAGE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(MED).map(function (key) {
              return (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">{MED[key].id}</StyledTableCell>
                <StyledTableCell align="right">{MED[key].name}</StyledTableCell>
                <StyledTableCell align="right">{MED[key].description}</StyledTableCell>
                <StyledTableCell align="right">{MedStage[key]}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <h4>{MED['0']?"":"NO DATA AVAILABLE"}</h4>
    </div>
    </>:""}
    </Container>
    </div>
  );
}

export default AddMed;
