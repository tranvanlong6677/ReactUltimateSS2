import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const handleClickLoginBtn = () => {
    navigate("/login");
  };

  const handleClickRegisterBtn = () => {
    navigate("/register");
  };
  return (
    <Navbar bg="light" expand="lg" className="px-5">
      {/* <Container> */}
      <NavLink to="/" className="nav-link navbar-brand">
        My App
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/admins" className="nav-link">
            Admin
          </NavLink>
        </Nav>
        <Nav>
          {isAuthenticated === false ? (
            <>
              <button
                className="btn btn-login btn-light"
                onClick={() => handleClickLoginBtn()}
              >
                Login
              </button>
              <button
                className="btn btn-signup btn-dark mx-3"
                onClick={() => handleClickRegisterBtn()}
              >
                Sign up
              </button>
            </>
          ) : (
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default Header;
