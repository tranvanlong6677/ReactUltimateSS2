import React, { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
  const [quizCurrentUpdate, setQuizCurrentUpdate] = useState({});
  const [quizCurrentDelete, setQuizCurrentDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
    // setListQuiz(res.DT);
  };
  const handleClickUpdateQuiz = (data) => {
    setIsShowModalUpdateQuiz(true);
    setQuizCurrentUpdate(data);
  };
  const handleClickDeleteQuiz = (data) => {
    setIsShowModalDeleteQuiz(true);
    setQuizCurrentDelete(data);
  };
  return (
    <div>
      <table className="table table-hover table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`quiz${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.type}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => handleClickUpdateQuiz(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        setShow={setIsShowModalUpdateQuiz}
        quizCurrentUpdate={quizCurrentUpdate}
        setQuizCurrentUpdate={setQuizCurrentUpdate}
        listQuiz={listQuiz}
        setListQuiz={setListQuiz}
        fetchQuiz={fetchQuiz}
      />
      <ModalDeleteQuiz
        show={isShowModalDeleteQuiz}
        setShow={setIsShowModalDeleteQuiz}
        quizCurrentDelete={quizCurrentDelete}
        setQuizCurrentDelete={setQuizCurrentDelete}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
};

export default TableQuiz;
