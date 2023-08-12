import { Link } from "react-router-dom";

import classes from "./SignupForm.module.css";
import favicon from "../../assests/favicon.png";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import {
  notifySuccess,
  notifyError,
  isThreeChars,
  isEmail,
  isSixChars,
} from "../../utlils";

const SignupForm = () => {
  const { isLoading, error, dbConnect: sendData, setError } = useHttp();

  if (error) {
    error && notifyError(error);
    setError(null);
  }

  const {
    input: name,
    setInput: setName,

    setInputTouched: setNameTouched,
    inputIsValid: nameIsValid,
    inputHasError: nameHasError,
    inputClasses: nameClasses,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isThreeChars);

  const {
    input: email,
    setInput: setEmail,
    setInputTouched: setEmailTouched,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    inputClasses: emailClasses,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    input: password,
    setInput: setPassword,
    setInputTouched: setPasswordTouched,
    inputIsValid: passwordIsValid,
    inputHasError: passwordHasError,
    inputClasses: passwordClasses,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isSixChars);

  const handleFormSubmit = async (events) => {
    events.preventDefault();

    const postRequest = (data) => {
      notifySuccess(data.msg);
      setName("");
      setEmail("");
      setPassword("");
      setNameTouched(false);
      setEmailTouched(false);
      setPasswordTouched(false);
    };

    const requiredConfig = {
      url: "/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: { email, name, password },
    };

    sendData(requiredConfig, postRequest);
  };

  const isFormValid = nameIsValid && emailIsValid && passwordIsValid;

  return (
    <div className={classes.main}>
      <div className="d-flex justify-content-center mb-4">
        <img src={favicon} />
        <h4 className={classes["site-name"]}>Intensify</h4>
      </div>

      <div className={classes.title}>
        <p>Register</p>
      </div>

      <form method="post" className={classes.form} onSubmit={handleFormSubmit}>
        <div className={classes["form-control"]}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className={nameClasses}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className={classes["error-msg"]}>Name is not valid</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className={emailClasses}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={classes["error-msg"]}>Email is not valid</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className={passwordClasses}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <p className={classes["error-msg"]}>Password is not valid</p>
          )}
        </div>

        <div className={classes.btns}>
          <button disabled={isLoading || !isFormValid} type="submit">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>

      <div className={classes["outer-link"]}>
        <p>
          Already have an account? <Link to="/login">Login </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
