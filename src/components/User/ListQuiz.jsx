import React from "react";
import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrayQuiz, setArrayQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    let res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrayQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((item, index) => {
          return (
            <>
              <div
                key={`${index} quiz`}
                className="card"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={`data:image/png;base64,${item.image}`}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1} </h5>
                  <p className="card-text">{item.description}</p>
                  <button
                    href="#"
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/quiz/${item.id}`, {
                        state: { quizTitle: `${item.description}` },
                      })
                    }
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </>
          );
        })}

      {arrayQuiz && arrayQuiz.length === 0 && (
        <div>You dont have any quiz now</div>
      )}
    </div>
  );
};

export default ListQuiz;
