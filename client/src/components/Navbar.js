import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllStudent, logoutAction } from "../store/actions/studentAction";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = localStorage.getItem("Student");
  const data = JSON.parse(name);

  function logout() {
    localStorage.removeItem("Student");
    localStorage.removeItem("Token");
    dispatch(logoutAction());
    navigate("/login");
  }
  return (
    <>
      <header>
        <nav className="container">
          <div className="logo">
            <Link to="/">Student</Link>
          </div>
          <div className="navlinks">
            {localStorage.getItem("Token") ? (
              <>
                <div className="links">
                  <Link to="/subject">Subject</Link>
                </div>
                <div className="links">
                  Welcome : <span>{data.username}</span>
                </div>
                <div className="links" onClick={logout}>
                  Logout
                </div>
              </>
            ) : (
              <>
                <div className="links">
                  <Link to="/login">Login</Link>
                </div>
                <div className="links">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
