import "react-pro-sidebar/dist/css/styles.css";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem, FaReact } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import sidebarBg from "../../assets/bg2.jpg";
const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <FaReact size={"3em"} color={"00bfff"} />
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Home
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <SubMenu icon={<MdDashboard />} title="Dashboard">
              <Link to="/admins" />
            </SubMenu>
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                Quản lý Users
                <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý Bài Quiz
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                Quản lý Câu hỏi
                <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>

            {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn btn btn-light"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Trần Long
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
