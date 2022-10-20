import React from "react";
class DisplayInfo extends React.Component {
  render() {
    return (
      <div>
        My name is {this.props.name} and my age is {this.props.age}
      </div>
    );
  }
}
export default DisplayInfo;
