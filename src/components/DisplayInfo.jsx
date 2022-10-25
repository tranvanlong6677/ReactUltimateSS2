import React from "react";
import "./DisplayInfo.scss";
import logo from "../logo.svg";
class DisplayInfo extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      show: true,
    };
  }

  handleShowHide = () => {
    this.setState({
      show: !this.state.show,
    });
    // alert("me");
  };
  componentDidMount() {
    console.log("Component did mount");
    setTimeout(() => {
      document.title = "LongTran";
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update", this.props, prevProps);
  }

  render() {
    const { listUsers } = this.props;
    console.log("render");
    return (
      <div className="display-info-container">
        <>
          <img src={logo} alt="" />
          <button onClick={() => this.handleShowHide()}>
            {this.state.show ? "Hide" : "Show"}
          </button>
        </>
        {this.state.show && (
          <div>
            {listUsers.map((item) => {
              return (
                <div key={item.id}>
                  <div className={item.age > 26 ? "green" : "red"}>
                    My name is {item.name} and my age is {item.age}
                  </div>
                  <button onClick={() => this.props.handleDeleteUser(item.id)}>
                    Delete
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfo;
