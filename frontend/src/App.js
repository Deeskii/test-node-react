import './App.css';
import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddPeep from "./components/add-peep.component";
import Peep from "./components/peep.component";
import PeepsList from "./components/peeps-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/peeps" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/peeps"} className="nav-link">
                Peeps
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/peeps"]} component={PeepsList} />
            <Route exact path="/add" component={AddPeep} />
            <Route path="/peeps/:id" component={Peep} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;