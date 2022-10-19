import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent";
import React from "react";

// const App = () => {
//   const count = useSelector((state) => state.counter.count);
//   const dispatch = useDispatch();

// return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>Hello world</p>
//     <div>Count = {count}</div>
//     <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//     <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//   </header>
// </div>
//     <div>
//       Hello world
//       <MyComponent />
//     </div>
//   );
// };

class App extends React.Component {
  state = {
    name: "Long",
    address: "Hanoi",
    age: 21,
  };
  render() {
    return (
      <div>
        Hello world
        <MyComponent />
      </div>
    );
  }
}

export default App;
