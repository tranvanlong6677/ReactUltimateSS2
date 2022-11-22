import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  console.log(dataModalResult);
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your result:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Correct answers:{" "}
            <b>
              {dataModalResult.countCorrect} / {dataModalResult.countTotal}
            </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Show answers
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
