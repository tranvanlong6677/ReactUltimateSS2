import React, { useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import {
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const QuizQA = () => {
  const initQuestions = [
    {
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
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
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

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImgPreview, setDataImgPreview] = useState({
    title: "",
    url: "",
  });

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

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };
  const handleSubmitQuesitonForQuiz = async () => {
    //to do
    //validate answer
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }
    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (!isValidAnswer) {
      toast.error(`Not empty answer ${indexA + 1} at question ${indexQ + 1}`);
    }

    //validate question
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty description for question ${indexQ1 + 1}`);
    }

    //submit questions

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuiz(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success(`Create questions and answer success`);
    setQuestions(initQuestions);
    //submit answers
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImgPreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container container">
      <div className="add-new-question">
        <div className="form-group col-6">
          <label>Select quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      onChange={(event) =>
                        handleOnChange("QUESTION", item.id, event.target.value)
                      }
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload" htmlFor={`${item.id}`}>
                      Upload Image
                    </label>
                    <input
                      id={`${item.id}`}
                      type="file"
                      hidden
                      onChange={(event) =>
                        handleOnChangeFileQuestion(item.id, event)
                      }
                    />

                    <span>
                      <BiImageAdd />
                      <span>
                        {item && item.imageName ? (
                          <span
                            onClick={() => handlePreviewImage(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="btn-add">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                    >
                      Add new
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
                      <div
                        className="answers-content my-3 mx-3"
                        key={`a-${index}`}
                      >
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                          checked={a.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              item.id,
                              a.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={a.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                item.id,
                                a.id,
                                event.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div className="mx-5">
            <button
              className="btn btn-dark"
              onClick={() => handleSubmitQuesitonForQuiz()}
            >
              Save questions
            </button>
          </div>
        )}
        {isPreviewImage && (
          <Lightbox
            image={dataImgPreview.url}
            title={dataImgPreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
