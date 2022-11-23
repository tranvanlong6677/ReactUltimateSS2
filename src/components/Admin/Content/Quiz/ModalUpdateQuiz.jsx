import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsPlusSquareDotted } from "react-icons/bs";
import _ from "lodash";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  putUpdateQuiz,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";

const ModalUpdateQuiz = (props) => {
  const {
    show,
    setShow,
    quizCurrentUpdate,
    setQuizCurrentUpdate,
    setListQuiz,
    listQuiz,
    fetchQuiz,
  } = props;
  const handleClose = () => {
    setShow(false);
    setId("");
    setName("");
    setDescription("");
    setImage("");
    setDifficulty("");
    setPreviewImg("");
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  useEffect(() => {
    if (!_.isEmpty(quizCurrentUpdate)) {
      setId(+quizCurrentUpdate.id);
      setName(quizCurrentUpdate.name);
      setDescription(quizCurrentUpdate.description);
      setImage(quizCurrentUpdate.image);
      setDifficulty(quizCurrentUpdate.difficulty);
      if (quizCurrentUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${quizCurrentUpdate.image}`);
      }
    }
    console.log("check quiz current update", quizCurrentUpdate);
  }, [quizCurrentUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };
  const handleSubmitUpdateQuiz = async () => {
    let res = await putUpdateQuiz(
      quizCurrentUpdate.id,
      description,
      name,
      difficulty,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuiz();
      setShow(false);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                onChange={(event) => setDifficulty(event.target.value)}
                value={difficulty}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="labelUpload" className="form-label label-upload">
                <BsPlusSquareDotted />
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
                // value={image}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImg ? (
                <img src={previewImg} alt="" />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
