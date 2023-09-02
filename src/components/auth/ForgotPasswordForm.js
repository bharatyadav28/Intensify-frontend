import { useLocation, useNavigate } from "react-router-dom";

import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { isEmail, isSixChars, notifyError, notifySuccess } from "../../utlils";
import classes from "./SignupForm.module.css";
import { OvalSpinner } from "../UI/LoadingSpinner";
import { getSearchParams } from "../../utlils";

const ForgotPasswordForm = ({ reset }) => {
  const validator = reset ? isSixChars : isEmail;

  const location = useLocation();
  const navigate = useNavigate();

  const { paramValue: emailParam } = getSearchParams({
    location,
    paramKey: "email",
  });
  const { paramValue: passwordToken } = getSearchParams({
    location,
    paramKey: "token",
  });

  const {
    input,
    setInput,
    setInputTouched,
    inputIsValid,
    inputHasError,
    inputClasses,
    inputChangeHandler,
    inputBlurHandler,
  } = useInput(validator);

  const { isLoading, error, dbConnect, setError } = useHttp();

  if (error) {
    notifyError(error);
    setError(null);
  }

  const handleFormSubmit = (events) => {
    const postRequest = (data) => {
      notifySuccess(data.msg);
      setInput("");
      setInputTouched(false);
      if (reset) {
        navigate("/login");
      }
    };

    let url = "/api/v1/auth";
    let body = reset
      ? { email: emailParam, passwordToken, password: input }
      : { email: input };

    const requiredConfig = {
      url: reset ? `${url}/reset-password` : `${url}/forgot-password`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    dbConnect(requiredConfig, postRequest);
    events.preventDefault();
  };

  const isFormValid = inputIsValid;

  return (
    <div className={`${classes.main} `} onSubmit={handleFormSubmit}>
      <div className={classes.title}>
        <p>{reset ? "Reset Password" : "Forgot Password"}</p>
      </div>
      <form method="post" className={inputClasses.form}>
        <div className={classes["form-control"]}>
          <label>{reset ? "Password" : "Email"}</label>
          <input
            type={reset ? "password" : "email"}
            value={input}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            className={inputClasses}
          />
          {inputHasError && (
            <p className={classes["error-msg"]}>
              {reset ? "Password " : "Email "}is not valid
            </p>
          )}
        </div>

        <div className={classes.btns}>
          <button disabled={isLoading || !isFormValid} type="submit">
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <OvalSpinner height={20} width={20} />{" "}
              </div>
            ) : reset ? (
              "New Password"
            ) : (
              "Get Reset Password Link"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
