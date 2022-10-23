import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "",
    address: "Hanoi",
    age: "",
  };
  // handleClickBtn = (event) => {
  //   // let newAge = Math.floor(Math.random() * 100) + 1;
  //   this.setState({
  //     name: "Long Tran",
  //     age: Math.floor(Math.random() * 100) + 1,
  //   });
  //   console.log(this.state.name);
  //   console.log(this.state.age);
  // };

  handleOnChangeInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleOnChangeAge = (event) => {
    this.setState({ age: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    // this.props.listUsers.push(this.state);
    console.log("check:", this.state);
    this.props.handleAddNewUser({
      ...this.state,
      id: Math.floor(Math.random() * 100 + 1) + "random",
    });
    // console.log(Math.floor(Math.random() * 100 + 1));
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

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfo;
