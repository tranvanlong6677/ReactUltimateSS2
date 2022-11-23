import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaHeart, FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>

        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

      {/* Same as */}
    </div>
  );
};

export default Admin;
