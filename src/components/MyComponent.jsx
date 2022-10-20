import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  //jsx

  render() {
    return (
      <div>
        <UserInfo />
        <br />
        <DisplayInfo name="Long" age="21" />
      </div>
    );
  }
}

export default MyComponent;
