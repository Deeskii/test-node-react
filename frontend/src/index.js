import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

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
                                Tutorials
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
                        <Route exact path={["/", "/peeps"]} component={TutorialsList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/peeps/:id" component={Tutorial} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
