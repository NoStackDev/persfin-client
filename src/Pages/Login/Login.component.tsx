import React from "react";

import "./Login.style.scss";

type Props = {};

const Login = (props: Props) => {
  return (
    <div id="login">
      <section id="app-title">PERSIN</section>
      <section>
        <form id="login-form">
          <div>
            <span className="material-icons">person</span>
            <input type="email" name="email" />
          </div>
          <div>
            <span className="material-icons">lock</span>
            <input type="password" name="password" id="" />
          </div>
          <button type="submit">Sign In</button>
          <div className="signup-message">
            Don't have an account? <a href="">Sign Up</a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
