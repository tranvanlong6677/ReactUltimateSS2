import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";

const DetailQuiz = () => {
  const [dataQuiz, setDataQuiz] = useState([]);
  const params = useParams();
  const quizId = params.id;
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    setDataQuiz(res.DT);
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
    dataQuiz &&
    dataQuiz.length !== 0 &&
    dataQuiz.map((item, index) => {
      return <div>{item.description}</div>;
    })
  );
  // :
  // <div>Not found</div>
};

export default DetailQuiz;
