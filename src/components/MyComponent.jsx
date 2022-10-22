import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  //jsx
  state = {
    listUsers: [
      { id: 1, name: "Long", age: 21 },
      { id: 2, name: "An", age: 30 },
      { id: 3, name: "Hieu", age: 27 },
    ],
  };
  handleAddNewUser = (newUser) => {
    this.setState({ listUsers: [newUser, ...this.state.listUsers] });
  };
  render() {
    return (
      <div>
        <AddUserInfo
          handleAddNewUser={this.handleAddNewUser}
          listUsers={this.state.listUsers}
        />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
