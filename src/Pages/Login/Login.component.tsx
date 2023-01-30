import React, { useState } from "react";
import Spinner from "../../Components/Spinner";
import { AuthUser, CreateUser } from "../../Mutations";
import { Navigate } from "react-router-dom";

import "./Login.style.scss";
import pb from "../../lib/pocketbase";

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

  const createUserMutation = CreateUser();
  const authUserMutation = AuthUser();

  const handleInputOnBlur = (inputId: number) => {
    setInputState({
      email: email.trim().length > 0,
      password: password.trim().length > 0,
      confirmPassword: confirmPassword.trim().length > 0,
    });
  };

  const handleAutofill = (eventEnd = false) => {
    if (!eventEnd) {
      setInputState({ ...inputState, email: true, password: true });
    }
    return
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (signUp) {
      createUserMutation.mutate({ email, password, confirmPassword });
      return;
    }

    authUserMutation.mutate({ email, password });
  };

  if (pb.authStore.model) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div id="login">
        <div className="login-card">
          <h1>PERSFIN</h1>
          <form action="">
            <div className="form-set">
              <input
                type="email"
                onAnimationStart={() => handleAutofill()}
                onAnimationEnd={() => handleAutofill(true)}
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

            {signUp ? (
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Sign up
              </button>
            ) : (
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Sign in
              </button>
            )}
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
      <Spinner mutation={createUserMutation} message={"signing up"} />
      <Spinner mutation={authUserMutation} message={"logging in"} />
    </>
  );
};

export default Login;
