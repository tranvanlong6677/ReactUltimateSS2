import React, { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import { BsPlusSquareDotted } from "react-icons/bs";
import TableUsers from "./TableUsers";
import { useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";
const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    fetchListUsers();
  }, []); //useEffect chạy sau khi hàm render chạy

  useEffect(() => {}, [listUsers]);
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
    return res.DT;
  };
  return (
    <div className="manage-user-container">
      <div className="title">Manage user</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <BsPlusSquareDotted />
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUsers listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
