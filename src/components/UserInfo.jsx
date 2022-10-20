import React from "react";

class UserInfo extends React.Component {
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

  handleOnChangeAge = (event) => {
    this.setState({ age: event.target.value });
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
            value={this.state.name}
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <br />
          <label htmlFor="">Age:</label>
          <input
            value={this.state.age}
            type="text"
            onChange={(event) => this.handleOnChangeAge(event)}
          />
          <br />
          <div>
            My name is {this.state.name} and my age is {this.state.age}
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
