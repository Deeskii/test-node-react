
import React, { Component } from "react";
import PeepDataService from "../services/peeps.service";

export default class Peep extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPeep = this.getPeep.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePeep = this.updatePeep.bind(this);
    this.deletePeep = this.deletePeep.bind(this);

    this.state = {
      currentPeep: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPeep(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPeep: {
          ...prevState.currentPeep,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPeep: {
        ...prevState.currentPeep,
        description: description
      }
    }));
  }

  getPeep(id) {
    PeepDataService.get(id)
      .then(response => {
        this.setState({
          currentPeep: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPeep.id,
      title: this.state.currentPeep.title,
      description: this.state.currentPeep.description,
      published: status
    };

    PeepDataService.update(this.state.currentPeep.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPeep: {
            ...prevState.currentPeep,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePeep() {
    PeepDataService.update(
      this.state.currentPeep.id,
      this.state.currentPeep
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The peep was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePeep() {    
    PeepDataService.delete(this.state.currentPeep.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/peeps')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPeep } = this.state;

    return (
      <div>
        {currentPeep ? (
          <div className="edit-form">
            <h4>Peep</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPeep.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPeep.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPeep.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPeep.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePeep}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePeep}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Peep...</p>
          </div>
        )}
      </div>
    );
  }
}