import React from "react";

class MyComponent extends React.Component {
  //jsx
  state = {
    name: "Long",
    address: "Hanoi",
    age: 21,
  };
  render() {
    return (
      <div>
        <div>My name is {this.state.name}</div>
      </div>
    );
  }
}

export default MyComponent;
