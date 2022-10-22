import React from "react";
import UserInfo from "./UserInfo";
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
  render() {
    return (
      <div>
        <UserInfo />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
