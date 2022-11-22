import React from "react";
import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  const handleCheckbox = (event, qId, aId) => {
    props.handleCheckBox(qId, aId);
  };
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      <div className="question">
        Question {index + 1}:{data.questionDescription}?
      </div>
      <div className="q-image d-flex justify-content-center">
        {data.image && <img src={`data:image/png;base64,${data.image}`} />}
      </div>

      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div className="a-child" key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleCheckbox(event, data.questionId, a.id)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
