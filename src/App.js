import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        test link
        <div>
          <button>
            <Link to="/users">Go to user page</Link>
          </button>
          <button>
            <Link to="/admins">Go to admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
