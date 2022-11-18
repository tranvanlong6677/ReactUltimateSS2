import { Routes, Route } from "react-router-dom";
import User from "./components/User/User.jsx";
import Admin from "./components/Admin/Admin.jsx";
import HomePage from "./components/Home/HomePage.jsx";
import Dashboard from "./components/Admin/Content/Dashboard.jsx";
import ManageUser from "./components/Admin/Content/ManageUser.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import ListQuiz from "./components/User/ListQuiz.jsx";

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
