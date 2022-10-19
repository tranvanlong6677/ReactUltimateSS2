import React from "react";

class MyComponent extends React.Component {
  //jsx
  render() {
    return (
      <div>
        <div>
          My first component
          {Math.random()}
        </div>
      </div>
    );
  }
}

export default MyComponent;
