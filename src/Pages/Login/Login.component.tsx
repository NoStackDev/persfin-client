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
  const [signUp, setSignUp] = useState(false);

  const handleInputOnBlur = (inputId: number) => {
    // switch (inputId) {
    //   case 0:
    //     if (email.length === 0) {
    //       setInputState({ ...inputState, email: false });
    //     }
    //     break;
    //   case 1:
    //     if (password.length === 0) {
    //       setInputState({ ...inputState, password: false });
    //     }
    //     break;
    //   case 2:
    //     if (confirmPassword.length === 0) {
    //       setInputState({ ...inputState, confirmPassword: false });
    //     }
    //     break;
    //   default:
    //     return;
    // }
    setInputState({
        email: email.trim().length>0,
        password: password.trim().length>0,
        confirmPassword: confirmPassword.trim().length>0
    })
  };

  const handleAutofill = (eventEnd=false) => {
    if (!eventEnd){
        setInputState({ ...inputState, email: true, password: true });
    }
    if (email.trim().length===0) {
        setInputState({ ...inputState, email: false, password: false });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);
  };

  return (
    <div id="login">
      <div className="login-card">
        <h1>PERSFIN</h1>
        <form action="">
          <div className="form-set">
            <input
              type="email"
              onAnimationStart={() => handleAutofill()}
              onAnimationEnd={()=> handleAutofill(true)}
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
          {signUp ? (
            <div className="form-set">
              <input
                type="password"
                onFocus={() =>
                  setInputState({ ...inputState, confirmPassword: true })
                }
                onBlur={() => handleInputOnBlur(2)}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                value={confirmPassword}
              />
              <label
                htmlFor=""
                className={inputState.confirmPassword ? "active" : "inactive"}
              >
                Confirm Password
              </label>
            </div>
          ) : null}

          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Login
          </button>
        </form>

        {signUp ? (
          <div>
            <span>Already have an account?</span>
            <span onClick={() => setSignUp(!signUp)}>Sign in</span>
          </div>
        ) : (
          <div>
            <span>Don't have an account?</span>
            <span onClick={() => setSignUp(!signUp)}>Sign up</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
