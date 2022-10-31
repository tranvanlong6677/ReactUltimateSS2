import "./App.scss";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
          {/* Khi nào vào 1 Route con nào thì component của Route con ấy sẽ thay thế cho Outlet
            Outlet sẽ được viết ở component cha
            Ở đây component App là cha nên sẽ viết Outlet ở đây
            Khi vào /users hay /admins thì component con tương ứng sẽ hiển thị thay thế cho Outlet
            Nhờ Outlet và nested route mà phần header sẽ luôn hiển thị khi các component con được render
          */}
        </div>
      </div>
    </div>
  );
};

export default App;
