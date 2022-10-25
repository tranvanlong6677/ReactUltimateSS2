import React from "react";
import "./DisplayInfo.scss";
import { useState } from "react";

const DisplayInfo = (props) => {
  const { listUsers } = props;
  const [isShowHideListUser, setIsShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setIsShowHideListUser(!isShowHideListUser);
  };
  // {
  //   console.log(props);
  // }
  return (
    <div className="display-info-container">
      <div>
        <button onClick={() => handleShowHideListUser()}>
          {isShowHideListUser ? "Hide list user" : "Show list user"}
        </button>
      </div>
      {isShowHideListUser && (
        <div>
          {listUsers.map((item) => {
            return (
              <div key={item.id}>
                <div className={item.age > 26 ? "green" : "red"}>
                  My name is {item.name} and my age is {item.age}
                </div>
                <button onClick={() => props.handleDeleteUser(item.id)}>
                  Delete
                </button>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DisplayInfo;
