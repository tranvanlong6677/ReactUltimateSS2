import React, { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import { BsPlusSquareDotted } from "react-icons/bs";
import TableUsers from "./TableUsers";
import { useEffect } from "react";
import {
  getAllUsers,
  getUserWithPaginate,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUsersPaginate from "./TableUserPaginate";
const ManageUser = () => {
  const LIMIT_USER = 4;
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewUser, setShowViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataViewUser, setDataViewUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []); //useEffect chạy sau khi hàm render chạy

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
    return res.DT;
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
      console.log("Res.data: ", res.DT);
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
          {/* <TableUsers
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickViewBtn={handleClickViewBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          /> */}

          <TableUsersPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickDeleteBtn={handleClickDeleteBtn}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetDataUpdate={resetDataUpdate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
