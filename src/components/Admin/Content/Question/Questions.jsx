import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";

const Questions = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="questions-container container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="form-group col-6">
          <label htmlFor="">Select quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>

        <div className="mt-5">Add questions</div>
        <div>
          <div className="questions-content ">
            <div class="form-floating description ">
              <input
                type="text"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">Upload Image</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <button className="btn btn-primary">Add new </button>
            </div>

            <div className="btn-delete">
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
          <div className="answers-content my-3">
            <input className="form-check-input is-correct" type="checkbox" />
            <div class="form-floating answer-name ">
              <input
                type="text"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Answer1</label>
              <div className="btn-action">
                <button className="btn btn-primary ">+ </button>
                <button className="btn btn-danger">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
