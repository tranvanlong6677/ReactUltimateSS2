import React, { useState } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import {
  postNewQuiz,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const ManageQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name and description is required");
      return;
    }
    let res = await postNewQuiz(description, name, type?.value, image);
    console.log("check res", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setType("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      //   setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="manage-quiz-container container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="title">Manage Quiz</span>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <div className="form-add-new-quiz my-5">
                <div className="title-form">Add new quiz</div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <label>Description</label>
                </div>
                <div className="quiz-type my-4">
                  <Select
                    options={options}
                    placeholder={"Quiz type"}
                    defaultValue={type}
                    onChange={setType}
                  />
                </div>
                <div className="more-actions">
                  <div className="mb-3">
                    <label htmlFor="upload" className="form-label">
                      Upload image for your quiz
                    </label>
                    <input
                      type="file"
                      id="upload"
                      className="form-control"
                      onChange={(e) => handleChangeFile(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  style={{
                    borderRadius: "5px",
                    width: "200px",
                    height: "40px",
                  }}
                  className="btn btn-dark"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className="title">Update Q/A Quizzes</span>
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span className="title">Assign to Users</span>
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
