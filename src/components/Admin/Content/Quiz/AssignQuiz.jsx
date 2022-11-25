import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
} from "../../../../services/apiServices";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchListUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `ID: ${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
    // setListQuiz(res.DT);
  };

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `ID: ${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
    // setListQuiz(res.DT);
  };
  return (
    <div className="assign-quiz-container row">
      <div className="form-group col-6">
        <label>Select quiz</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="form-group col-6">
        <label>Select user</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>

      <div>
        <button className="btn btn-primary mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
