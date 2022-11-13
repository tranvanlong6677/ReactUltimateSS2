import React, { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import { BsPlusSquareDotted } from "react-icons/bs";
import TableUsers from "./TableUsers";
import { useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataViewUser, setDataViewUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});
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

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const resetDataViewUser = () => {
    setDataViewUser({});
  };

  const handleClickViewBtn = (user) => {
    setShowViewUser(true);
    setDataViewUser(user);
  };

  const handleClickDeleteBtn = (user) => {
    console.log(">>> check data user delete:  ", user);
    setShowModalDeleteUser(true);
    setDataDeleteUser(user);
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
          <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickViewBtn={handleClickViewBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetDataUpdate={resetDataUpdate}
        />

        <ViewUser
          show={showViewUser}
          setShow={setShowViewUser}
          dataViewUser={dataViewUser}
          resetDataViewUser={resetDataViewUser}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDeleteUser={dataDeleteUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
