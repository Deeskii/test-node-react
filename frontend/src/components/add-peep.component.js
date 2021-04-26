import React, { useState } from "react";
import PeepDataService from "../services/peeps.service";

const AddPeep = () => {
  const initialPeepState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [peep, setPeep] = useState(initialPeepState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPeep({ ...peep, [name]: value });
  };

  const savePeep = () => {
    var data = {
      title: peep.title,
      description: peep.description
    };

    PeepDataService.create(data)
      .then(response => {
        setPeep({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPeep = () => {
    setPeep(initialPeepState);
    setSubmitted(false);
  };

  return (
        <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPeep}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={peep.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={peep.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={savePeep} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPeep;