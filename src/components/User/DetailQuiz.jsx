import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss";

import _ from "lodash";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
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
    }
  };
  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img src="" alt="" />
        </div>
        <div className="q-content">
          <div className="question">Question 1:afisbfisabdif</div>
          <div className="answer">
            <div className="child">A</div>
            <div className="child">B</div>
            <div className="child">C</div>
          </div>
        </div>
        <div className="footer d-flex justify-content-center">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary mx-3">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
  // :
  // <div>Not found</div>
};

export default DetailQuiz;
