import React, { ChangeEvent, useState } from "react";
import Spinner from "../../Components/Spinner";
import { AuthUser, CreateUser } from "../../Mutations";
import { Navigate } from "react-router-dom";

import "./Login.style.scss";
import pb from "../../lib/pocketbase";

type Props = {};

const Login = (props: Props) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [inputState, setInputState] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [formErrors, setFormErrors] = useState<{
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUp, setSignUp] = useState(false);

  const createUserMutation = CreateUser();
  const authUserMutation = AuthUser();

  const handleInputOnBlur = (inputId: number) => {
    setInputState({
      email: inputValues.email.trim().length > 0,
      password: inputValues.password.trim().length > 0,
      confirmPassword: inputValues.confirmPassword.trim().length > 0,
    });
  };

  const handleAutofill = (eventEnd = false) => {
    if (!eventEnd) {
      setInputState({ ...inputState, email: true, password: true });
    }
    return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim() });

    // check email match @{domain name}.{domain}
    const formatPattern =
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+[.][A-za-z0-9.-]+$/gm;
    // check password length
    const lengthPattern = /^([a-zA-Z0-9_-~!@$%&]){8,}$/;

    switch (e.target.name) {
      case "email":
        if (!e.target.value.match(formatPattern)?.length) {
          setFormErrors({
            ...formErrors,
            email: "format should be example@mail.com",
          });
        } else {
          setFormErrors({
            ...formErrors,
            email: null,
          });
        }
        break;

      case "password":
        if (!e.target.value.match(lengthPattern)?.length) {
          setFormErrors({
            ...formErrors,
            password: "minimum length of 8 required",
          });
        } else {
          setFormErrors({
            ...formErrors,
            password: null,
          });
        }
        break;

      case "confirmPassword":
        // console.log("password: ", inputValues.password)
        // console.log("confirm password: ", inputState.)
        if (inputValues.password !== e.target.value) {
          setFormErrors({
            ...formErrors,
            confirmPassword: "does not match password",
          });
        } else {
          setFormErrors({
            ...formErrors,
            confirmPassword: null,
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (signUp) {
      if (
        !formErrors.email ||
        !formErrors.password ||
        !formErrors.confirmPassword
      ) {
        console.log("invalid");
        setFormErrors({
          ...formErrors,
          email: formErrors.email || "required",
          password: formErrors.password || "required",
        });
        return;
      }

      createUserMutation.mutate({
        email: inputValues.email,
        password: inputValues.password,
        confirmPassword: inputValues.confirmPassword,
      });
      return;
    }

    authUserMutation.mutate({
      email: inputValues.email,
      password: inputValues.password,
    });
  };

  if (pb.authStore.model) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <div id="login">
        <div className="login-card">
          <h1>PERSFIN</h1>
          <form action="" className={signUp ? "sign-up" : undefined}>
            <div className="form-set">
              <input
                type="email"
                id="email"
                name="email"
                onAnimationStart={() => handleAutofill()}
                onAnimationEnd={() => handleAutofill(true)}
                onFocus={() => setInputState({ ...inputState, email: true })}
                onBlur={() => handleInputOnBlur(0)}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="email"
                className={inputState.email ? "active" : "inactive"}
              >
                Email
              </label>
              {signUp ? (
                <p className="validation-message">{formErrors.email}</p>
              ) : null}
            </div>
            <div className="form-set">
              <input
                type="password"
                id="password"
                name="password"
                onFocus={() => setInputState({ ...inputState, password: true })}
                onBlur={() => handleInputOnBlur(1)}
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="password"
                className={inputState.password ? "active" : "inactive"}
              >
                Password
              </label>
              {signUp ? (
                <p className="validation-message">{formErrors.password}</p>
              ) : null}
            </div>
            {signUp ? (
              <>
                <div className="form-set">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onFocus={() =>
                      setInputState({ ...inputState, confirmPassword: true })
                    }
                    onBlur={() => handleInputOnBlur(2)}
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={
                      inputState.confirmPassword ? "active" : "inactive"
                    }
                  >
                    Confirm Password
                  </label>
                  {signUp ? (
                    <p className="validation-message">
                      {formErrors.confirmPassword}
                    </p>
                  ) : null}
                </div>
              </>
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
      <Spinner
        mutation={createUserMutation}
        loadingMessage={"signing up"}
        successMessage={"signed up"}
        failMessage={"failed"}
      />
      <Spinner
        mutation={authUserMutation}
        loadingMessage={"sign in"}
        successMessage={"signed in"}
        failMessage={"incorrect email or password"}
      />
    </>
  );
};

export default Login;
