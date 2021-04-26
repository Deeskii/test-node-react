import React, { Component } from "react";
import PeepDataService from "../services/peeps.service";
import { Link } from "react-router-dom";

export default class PeepsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePeeps = this.retrievePeeps.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePeep = this.setActivePeep.bind(this);
    this.removeAllPeeps = this.removeAllPeeps.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      peeps: [],
      currentPeep: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrievePeeps();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrievePeeps() {
    PeepDataService.getAll()
      .then(response => {
        this.setState({
          peeps: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePeeps();
    this.setState({
      currentPeep: null,
      currentIndex: -1
    });
  }

  setActivePeep(peep, index) {
    this.setState({
      currentPeep: peep,
      currentIndex: index
    });
  }

  removeAllPeeps() {
    PeepDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    PeepDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          peeps: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, peeps, currentPeep, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Peeps List</h4>

          <ul className="list-group">
            {peeps &&
              peeps.map((peep, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePeep(peep, index)}
                  key={index}
                >
                  {peep.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPeeps}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPeep ? (
            <div>
              <h4>Peep</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPeep.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPeep.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPeep.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/peeps/" + currentPeep.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Peep...</p>
            </div>
          )}
        </div>
      </div>
      )
  }
  
}