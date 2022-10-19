import React from "react";

class MyComponent extends React.Component {
  //jsx
  state = {
    name: "Long",
    address: "Hanoi",
    age: 21,
  };
  handleClickBtn = (event) => {
    // let newAge = Math.floor(Math.random() * 100) + 1;
    this.setState({
      name: "Long Tran",
      age: Math.floor(Math.random() * 100) + 1,
    });
    console.log(this.state.name);
    console.log(this.state.age);
  };

  handleOnChangeInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
        <div>My name is {this.state.name}</div>
      </div>
    );
  }
}

export default MyComponent;
