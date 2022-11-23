import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { BsPlusSquareDotted } from "react-icons/bs";
// import { toast } from "react-toastify";
// import { postCreateNewUser } from "../../../services/apiServices";

const ViewUser = (props) => {
  const { show, setShow, dataViewUser, resetDataViewUser } = props;
  const handleClose = () => {
    setShow(false);
    setEmail();
    setPassword();
    setUsername();
    setImage();
    setRole();
    setPreviewImg();
    resetDataViewUser();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    setEmail(dataViewUser.email);
    setPassword(dataViewUser.password);
    setUsername(dataViewUser.username);
    // setImage();
    setRole(dataViewUser.role);
    if (dataViewUser.image) {
      setPreviewImg(`data:image/jpeg;base64,${dataViewUser.image}`);
    }
  }, [dataViewUser]);
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
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                disabled={true}
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                disabled={true}
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                disabled={true}
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                disabled={true}
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUser;
