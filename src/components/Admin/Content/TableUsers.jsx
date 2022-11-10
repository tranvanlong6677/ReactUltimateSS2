import React, { useState } from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";
const TableUsers = (props) => {
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
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user${item.id}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan="4">Not found user</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUsers;
