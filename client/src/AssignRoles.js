import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableContainer } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import toggleAlert from "./methods/Alert";

function AssignRoles() {
  //function to display backtotop button

  window.onscroll = function () {
    scrollFunction();
  };

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  function scrollFunction() {
    let btnEle = document.querySelector(".backtotop");
    if (
      document.body.scrollTop > window.screen.height ||
      document.documentElement.scrollTop > 100
    ) {
      btnEle.style.display = "block";
    } else {
      btnEle.style.display = "none";
    }
  }

  //scroll to particular div

  const scrollToEle = (ele) => {
    let elem = document.getElementById(ele);
    if (elem) elem.scrollIntoView();
  };

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
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();

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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };

  try {
    if (loader) {
      document.querySelector(".loading").style.display = "block";
    } else document.querySelector(".loading").style.display = "none";
  } catch (error) {
    console.log(error);
  }

  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };
  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };
  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };
  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };
  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };
  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };
  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };
  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };
  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };
  const handlerChangeAddressRET = (event) => {
    setRETaddress(event.target.value);
  };
  const handlerChangePlaceRET = (event) => {
    setRETplace(event.target.value);
  };
  const handlerChangeNameRET = (event) => {
    setRETname(event.target.value);
  };

  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRMS(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert("Success", "Successfully added supplier");
        scrollToEle("suppliers_section");
        loadBlockchaindata();
      }
    } catch (err) {
      console.log(err);
      toggleAlert("Error", "Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addManufacturer(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert("Success", "Successfully added Manufacturer");
        scrollToEle("manufacturers_section");
        loadBlockchaindata();
      }
    } catch (err) {
      toggleAlert("Error", "Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addDistributor(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert("Success", "Successfully added Distributor");
        scrollToEle("distributors_section");
        loadBlockchaindata();
      }
    } catch (err) {
      toggleAlert("Error", "Something went Wrong, Please check instructions.");
    }
  };
  const handlerSubmitRET = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRetailer(RETaddress, RETname, RETplace)
        .send({ from: currentaccount });
      if (reciept) {
        toggleAlert("Success", "Successfully added Retailer");
        scrollToEle("retailers_section");
        loadBlockchaindata();
      }
    } catch (err) {
      toggleAlert("Error", "Something went Wrong, Please check instructions.");
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
          <div className="heading">Register Raw material supplier</div>

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
                  label="Ethereum Address"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeAddressRMS}
                />
                <TextField
                  label="Supplier Name"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeNameRMS}
                />
                <TextField
                  label="Based In"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangePlaceRMS}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handlerSubmitRMS}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "10px" }}
                  onClick={(e) => scrollToEle("suppliers_section")}
                >
                  Show All Suppliers
                </Button>
              </div>
            </FormControl>
          </div>
        </div>

        <div className="forms_container">
          <div className="heading">Register Manufacturer</div>

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
                  label="Ethereum Address"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeAddressMAN}
                />
                <TextField
                  label="Manufacturer Name"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeNameMAN}
                />
                <TextField
                  label="Based In"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangePlaceMAN}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handlerSubmitMAN}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "10px" }}
                  onClick={(e) => scrollToEle("manufacturers_section")}
                >
                  Show All Manufacturers
                </Button>
              </div>
            </FormControl>
          </div>
        </div>

        <div className="forms_container">
          <div className="heading">Register Distributors</div>
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
                  label="Ethereum Address"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeAddressDIS}
                />
                <TextField
                  label="Distributor Name"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeNameDIS}
                />
                <TextField
                  label="Based In"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangePlaceDIS}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handlerSubmitDIS}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "10px" }}
                  onClick={(e) => scrollToEle("distributors_section")}
                >
                  Show All Distributors
                </Button>
              </div>
            </FormControl>
          </div>
        </div>

        <div className="forms_container" style={{ marginBottom: "100vh" }}>
          <div className="heading">Register Retailers</div>
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
                  label="Ethereum Address"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeAddressRET}
                />
                <TextField
                  label="Retailer Name"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangeNameRET}
                />
                <TextField
                  label="Based In"
                  variant="outlined"
                  required="true"
                  onChange={handlerChangePlaceRET}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handlerSubmitRET}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ margin: "10px" }}
                  onClick={(e) => scrollToEle("retailers_section")}
                >
                  Show All Retailers
                </Button>
              </div>
            </FormControl>
          </div>
        </div>

        {loader ? (
          ""
        ) : (
          <>
            <div className="roles_container" id="suppliers_section">
              <div className="roles_heading">Raw Material Suppliers</div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">NAME</StyledTableCell>
                      <StyledTableCell align="right">PLACE</StyledTableCell>
                      <StyledTableCell align="right">
                        ETHERIUM ADDRESS
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => ( */}

                    {Object.keys(RMS).map(function (key) {
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {RMS[key].id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RMS[key].name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RMS[key].place}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RMS[key].addr}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4>{RMS["0"] ? "" : "NO DATA AVAILABLE"}</h4>
            </div>
            <div className="roles_container" id="manufacturers_section">
              <div className="roles_heading">Manufacturers</div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">NAME</StyledTableCell>
                      <StyledTableCell align="right">PLACE</StyledTableCell>
                      <StyledTableCell align="right">
                        ETHERIUM ADDRESS
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(MAN).map(function (key) {
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {MAN[key].id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {MAN[key].name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {MAN[key].place}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {MAN[key].addr}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4>{MAN["0"] ? "" : "NO DATA AVAILABLE"}</h4>
            </div>
            <div className="roles_container" id="distributors_section">
              <div className="roles_heading">Distributors</div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">NAME</StyledTableCell>
                      <StyledTableCell align="right">PLACE</StyledTableCell>
                      <StyledTableCell align="right">
                        ETHERIUM ADDRESS
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(DIS).map(function (key) {
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {DIS[key].id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {DIS[key].name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {DIS[key].place}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {DIS[key].addr}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4>{DIS["0"] ? "" : "NO DATA AVAILABLE"}</h4>
            </div>
            <div
              className="roles_container"
              id="retailers_section"
              style={{ height: "100vh" }}
            >
              <div className="roles_heading">Retailers</div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="right">NAME</StyledTableCell>
                      <StyledTableCell align="right">PLACE</StyledTableCell>
                      <StyledTableCell align="right">
                        ETHERIUM ADDRESS
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(RET).map(function (key) {
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {RET[key].id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RET[key].name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RET[key].place}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {RET[key].addr}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4>{RET["0"] ? "" : "NO DATA AVAILABLE"}</h4>
            </div>
          </>
        )}
      </Container>
      <div className="backtotop">
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: "10px" }}
          onClick={(e) => goToTop()}
          className="backtotop"
        >
          Back to top
        </Button>
      </div>
    </div>
  );
}

export default AssignRoles;
