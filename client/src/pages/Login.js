import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const data = { email, password };

    let res = await fetch("http://localhost:2000/api/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    localStorage.setItem("Student", JSON.stringify(res));
    localStorage.setItem("Token", JSON.stringify(res.accessToken));
    navigate("/");
  }

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="login">
            <h1>Login</h1>

            <form onSubmit={login}>
              <label htmlFor="">
                <h3>Email : </h3>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="">
                <h3>Password : </h3>
                <input
                  type="password"
                  name="Password"
                  id=""
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <input type="submit" value="Login" />
            </form>
            <h2>
              No Account? -{" "}
              <span>
                {" "}
                <Link to="/register">Register</Link>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
