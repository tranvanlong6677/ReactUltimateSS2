import React from "react";

class MyComponent extends React.Component {
  //jsx
  state = {
    name: "Long",
    address: "Hanoi",
    age: 21,
  };
  handleClickBtn(event) {
    console.log(event);
    console.log(this.state.name);
  }
  render() {
    return (
      <div>
        <div>My name is {this.state.name}</div>
        <button onMouseOver={this.handleClickBtn}>Hover me</button>
        <button onClick={this.handleClickBtn}>Click me</button>
      </div>
    );
  }
}

export default MyComponent;
