import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = () => {
  const [dataQuiz, setDataQuiz] = useState([]);
  const params = useParams();
  const quizId = params.id;
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let data = await getDataQuiz(quizId);
    console.log(data.DT);
    setDataQuiz(data.DT);
  };
  console.log(params);
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
