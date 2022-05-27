import './App.css';
import React from 'react';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddMed from './AddMed';
import Supply from './Supply'
import Track from './Track'
import { Alert } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Instructions from './Instructions';

function App() {
  return (
    <div className="App">
      <Router>
      <nav class="navbar navbar-light bg-light">
        <Link class="navbar-brand" h1 to={'/'}>
          DRUG TRACABILITY
          </Link>
        <div>
        <Link to={'/instructions'}><button className="instructions btn btn-info">instructions</button></Link>
        <Link to={'/'}><button className="btn btn-danger mx-2">Home</button></Link>

        </div>
      </nav>
      <div id='alertError' >
      <Alert variant="filled" severity="error" sx={{marginTop:"10vh"}} >
      This is an error alert — check it out!
      </Alert>
      </div>
      <div className="loading">
      <LinearProgress />
      </div>
      <div id='alertSuccess'>
      <Alert variant="filled" severity="success" sx={{marginTop:"10vh"}} >
      This is an error alert — check it out!
      </Alert>
      </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
          <Route path="/instructions" component={Instructions} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
