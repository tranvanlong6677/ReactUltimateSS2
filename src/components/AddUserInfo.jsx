import React from "react";
import { useState } from "react";

const AddUserInfo = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("Hanoi");
  const [age, setAge] = useState("");

  const handleOnChangeInput = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      name: name,
      address: address,
      age: age,
      id: Math.floor(Math.random() * 100 + 1) + "random",
    });
  };

  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label htmlFor="">Name:</label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnChangeInput(event)}
        />
        <br />
        <label htmlFor="">Age:</label>
        <input
          value={age}
          type="text"
          onChange={(event) => handleOnChangeAge(event)}
        />
        <br />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfo;
