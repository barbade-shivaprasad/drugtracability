import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { StepConnector } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { LinearProgress } from "@mui/material";
import toggleAlert from "./methods/Alert";


function Track() {
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
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <LinearProgress sx={{marginTop:"8vh"}}/>
    );
  }

  const handlerChangeID = (event) => {
    showTrackTillDistribution(false)
    showTrackTillManufacture(false)
    showTrackTillOrdered(false)
    showTrackTillRMS(false)
    showTrackTillRetail(false)
    showTrackTillSold(false)
    setID(event.target.value);

  };
  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    if (!(ID > 0 && ID <= ctr)) 
    toggleAlert('Error',"Invalid Medicine ID");
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
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
          className="roles_container"
          style={{ paddingTop: "5vh", height: "inherit", marginBottom: "30px" }}
        >
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
                      <StyledTableCell component="th" scope="row">
                        {MED[key].id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {MED[key].name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {MED[key].description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {MedStage[key]}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <h4>{MED["1"] ? "" : "NO DATA AVAILABLE"}</h4>
        </div>

        <div className="forms_container" style={{ marginBottom: "5rem" }}>
          <div className="heading" style={{ margin: "30px 10px" }}>
            Enter Medecine ID to TRACK
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
                  onClick={handlerSubmit}
                >
                  Track
                </Button>
              </div>
            </FormControl>
          </div>
        </div>
      </Container>

      <Container maxWidth="md">
        { TrackTillOrdered || TrackTillRMS || TrackTillDistribution || TrackTillManufacture || TrackTillRetail || TrackTillSold ?
        <><div class="card">
          <div class="card-header">Medicine Details</div>
          <div class="card-body">
            <div><span id="card_key">Medicine ID : </span><span>{MED[ID].id}</span></div>
            <div><span id="card_key">Name : </span><span>{MED[ID].name}</span></div>
            <div><span id="card_key">Description : </span><span>{MED[ID].description}</span></div>
            <div><span id="card_key">Current Stage : </span><span>{MedStage[ID]}</span></div>
          </div>
        </div><div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:""}
        
        { TrackTillRMS || TrackTillDistribution || TrackTillManufacture || TrackTillRetail || TrackTillSold?
        <><div class="card">
          <div class="card-header">Raw Material Supplier Details</div>
          <div class="card-body">
            <div><span id="card_key">Supplier ID: </span><span>{RMS[MED[ID].RMSid].id}</span></div>
            <div><span id="card_key">Name : </span><span>{RMS[MED[ID].RMSid].name}</span></div>
            <div><span id="card_key">Place : </span><span>{RMS[MED[ID].RMSid].place}</span></div>
          </div>
        </div> <div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:""}
        {TrackTillDistribution || TrackTillManufacture || TrackTillRetail || TrackTillSold?
        <><div class="card">
          <div class="card-header">Manufacturer Details</div>
          <div class="card-body">
            <div><span id="card_key">Manufacturer ID: </span><span>{MAN[MED[ID].MANid].id}</span></div>
            <div><span id="card_key">Name : </span><span>{MAN[MED[ID].MANid].name}</span></div>
            <div><span id="card_key">Place : </span><span>{MAN[MED[ID].MANid].place}</span></div>
          </div>
        </div><div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:""}
        { TrackTillDistribution || TrackTillRetail || TrackTillSold?
        <><div class="card">
          <div class="card-header">Distributor details Details</div>
          <div class="card-body">
            <div><span id="card_key">Distributor ID: </span><span>{DIS[MED[ID].DISid].id}</span></div>
            <div><span id="card_key">Name : </span><span>{DIS[MED[ID].DISid].name}</span></div>
            <div><span id="card_key">Place : </span><span>{DIS[MED[ID].DISid].place}</span></div>
          </div>
        </div><div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:""}
        { TrackTillRetail || TrackTillSold?
        <><div class="card">
          <div class="card-header">Retailer Details</div>
          <div class="card-body">
            <div><span id="card_key">Retailer ID: </span><span>{RET[MED[ID].RETid].id}</span></div>
            <div><span id="card_key">Name : </span><span>{RET[MED[ID].RETid].name}</span></div>
            <div><span id="card_key">Place : </span><span>{RET[MED[ID].RETid].place}</span></div>
          </div>
        </div><div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:""}
        { TrackTillSold?
        <><div class="card">
          <div class="card-header">Status</div>
          <h5 class="card-title">Sold</h5>
        </div><div className="arrowContainer"><ArrowCircleLeftIcon  fontSize="large" className="arrowDown"/></div></>:((TrackTillDistribution || TrackTillManufacture || TrackTillOrdered || TrackTillRMS || TrackTillRetail)?<h4>PROCESSING</h4>:"")}
        


      </Container>
    </div>
  );
}

export default Track;
