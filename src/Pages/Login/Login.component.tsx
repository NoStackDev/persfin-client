import React, { useState } from "react";

import "./Login.style.scss";

type Props = {};

const Login = (props: Props) => {
  const [inputState, setInputState] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputOnBlur = (inputId: number) => {
    switch (inputId) {
      case 0:
        if (email.length === 0) {
          setInputState({ ...inputState, email: false });
        }
        break;
      case 1:
        if (password.length === 0) {
          setInputState({ ...inputState, password: false });
        }
        break;
      case 2:
        if (confirmPassword.length === 0) {
          setInputState({ ...inputState, confirmPassword: false });
        }
        break;
      default:
        return;
    }
  };

  return (
    <div id="login">
      <div className="login-card">
        <h1>PERSFIN</h1>
        <form action="">
          <div className="form-set">
            <input
              type="email"
              onFocus={() => setInputState({ ...inputState, email: true })}
              onBlur={() => handleInputOnBlur(0)}
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
            />
            <label
              htmlFor=""
              className={inputState.email ? "active" : "inactive"}
            >
              Email
            </label>
          </div>
          <div className="form-set">
            <input
              type="password"
              onFocus={() => setInputState({ ...inputState, password: true })}
              onBlur={() => handleInputOnBlur(1)}
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password}
            />
            <label
              htmlFor=""
              className={inputState.password ? "active" : "inactive"}
            >
              Password
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <span>Don't have an account?</span>
          <span>
            <a href="">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
