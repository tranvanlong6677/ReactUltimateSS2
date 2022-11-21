import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss";
import Question from "./Question";

import _ from "lodash";
import { set } from "nprogress";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const handlePrevClick = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  };
  const handleNextClick = () => {
    if (dataQuiz && index + 1 < dataQuiz.length) {
      setIndex(index + 1);
    }
  };
  const handleCheckBox = (questionId, answerId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    console.log("check question", question);
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      // console.log("check b", b);
      question.answers = b;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +question.questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  const handleFinishClick = () => {};
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };
  console.log("check dataQuiz", dataQuiz);
  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body"></div>
        <div className="q-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer d-flex justify-content-center">
          <button
            className="btn btn-secondary"
            onClick={() => handlePrevClick()}
          >
            Prev
          </button>
          <button
            className="btn btn-primary mx-3"
            onClick={() => handleNextClick()}
          >
            Next
          </button>

          <button
            className="btn btn-warning"
            onClick={() => handleFinishClick()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
  // :
  // <div>Not found</div>
};

export default DetailQuiz;
