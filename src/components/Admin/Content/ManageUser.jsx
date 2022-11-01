import React, { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage user</div>
      <div className="user-content">
        <div>
          <button>Add new user</button>
        </div>
        <div>Table user</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
