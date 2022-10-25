import React from "react";
import "./DisplayInfo.scss";
import { useState } from "react";
// class DisplayInfo extends React.Component {
//   handleShowHide = () => {
//     this.setState({
//       show: !this.state.show,
//     });
//     // alert("me");
//   };

//   render() {
//     const { listUsers } = this.props;
//     console.log("render");
//     return (
//       <div className="display-info-container">
//         {true && (
//           <div>
//             {listUsers.map((item) => {
//               return (
//                 <div key={item.id}>
//                   <div className={item.age > 26 ? "green" : "red"}>
//                     My name is {item.name} and my age is {item.age}
//                   </div>
//                   <button onClick={() => this.props.handleDeleteUser(item.id)}>
//                     Delete
//                   </button>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfo = (props) => {
  const { listUsers } = props;
  return (
    <div className="display-info-container">
      {true && (
        <div>
          {listUsers.map((item) => {
            return (
              <div key={item.id}>
                <div className={item.age > 26 ? "green" : "red"}>
                  My name is {item.name} and my age is {item.age}
                </div>
                <button onClick={() => props.handleDeleteUser(item.id)}>
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
};
export default DisplayInfo;
