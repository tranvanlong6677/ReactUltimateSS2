import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, quizCurrentDelete, setQuizCurrentDelete, fetchQuiz } =
    props;

  const handleClose = () => setShow(false);
  const handleConfirmDelete = async () => {
    let res = await deleteQuiz(quizCurrentDelete.id);
    console.log(res);
    fetchQuiz();
    setShow(false);
  };
  console.log("check quiz current delete", quizCurrentDelete);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete the quiz,id = <b>{quizCurrentDelete.id}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
