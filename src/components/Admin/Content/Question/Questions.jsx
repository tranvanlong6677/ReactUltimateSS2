import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const Questions = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      image: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
    console.log("check type:", type);
    console.log("check id", id);
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    console.log("check :", type, questionId, answerId);
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };
  console.log("check questions:", questions);
  return (
    <div className="questions-container container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="form-group col-6">
          <label>Select quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>

        <div className="mt-5">Add questions</div>
        {questions &&
          questions.length > 0 &&
          questions.map((item, index) => {
            return (
              <div className="q-main mb-4" key={item.id}>
                <div className="questions-content ">
                  <div className="form-floating description ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={item.description}
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload">Upload Image</label>
                    <input type="file" hidden />

                    <span>
                      <BiImageAdd />0 file is uploaded
                    </span>
                  </div>
                  <div className="btn-add">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                    >
                      Add new{" "}
                    </button>
                  </div>

                  <div className="btn-delete">
                    {questions.length > 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", item.id)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {item.answers &&
                  item.answers.length &&
                  item.answers.map((a, index) => {
                    return (
                      <div className="answers-content my-3 mx-3">
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                        />
                        <div className="form-floating answer-name ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={a.description}
                          />
                          <label>Answer {index + 1}</label>
                          <div className="btn-action">
                            <button
                              className="btn btn-primary "
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", item.id)
                              }
                            >
                              +{" "}
                            </button>
                            {item.answers.length > 1 && (
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleAddRemoveAnswer("REMOVE", item.id, a.id)
                                }
                              >
                                -
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
