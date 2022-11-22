import React, { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

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
      <div className="title text-center">Manage Quiz</div>
      <hr />
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
            {/* <label
              htmlFor="upload"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Upload image for your quiz
            </label>
            <input
              type="file"
              hidden
              id="upload"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}

              //   value={image}
            /> */}
            <div class="mb-3">
              <label htmlFor="upload" class="form-label">
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
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
