import React from "react";
class DisplayInfo extends React.Component {
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        {listUsers.map((item) => {
          return (
            <div key={item.id}>
              <div>
                My name is {item.name} and my age is {item.age}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
export default DisplayInfo;
