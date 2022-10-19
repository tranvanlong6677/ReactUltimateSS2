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
  render() {
    return (
      <div>
        <div>My name is {this.state.name}</div>
        <button onMouseOver={(event) => this.handleClickBtn(event)}>
          Hover me
        </button>
        <button onClick={(event) => this.handleClickBtn(event)}>
          Click me
        </button>
      </div>
    );
  }
}

export default MyComponent;
