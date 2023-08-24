import { Link, useNavigate, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./SignupForm.module.css";
import favicon from "../../assests/favicon.png";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { notifySuccess, notifyError, isEmail, isSixChars } from "../../utlils";
import retreiveCurrentUser from "../../store/current-user-action";
import { useGetCartItemsQuery } from "../../store/apis/cart-api";

const LoginForm = ({ createLoginStorage }) => {
  const { isLoading, error, dbConnect: sendData, setError } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { refetch } = useGetCartItemsQuery();

  if (error) {
    error && notifyError(error);
    setError(null);
  }

  const {
    input: email,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    inputClasses: emailClasses,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    input: password,
    inputIsValid: passwordIsValid,
    inputHasError: passwordHasError,
    inputClasses: passwordClasses,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isSixChars);

  // on form submit
  const handleFormSubmit = async (events) => {
    events.preventDefault();

    const postRequest = (data) => {
      notifySuccess(data.msg);
      notifySuccess("Hello " + data?.user?.name);
      localStorage.setItem("login", true);
      createLoginStorage();
      navigate("/");
    };

    const requiredConfig = {
      url: "/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: { email, password },
    };

    sendData(requiredConfig, postRequest);
  };

  const isFormValid = emailIsValid && passwordIsValid;

  return (
    <div className={classes.main}>
      <div className="d-flex justify-content-center mb-4">
        <img src={favicon} />
        <h4 className={classes["site-name"]}>Intensify</h4>
      </div>

      <div className={classes.title}>
        <p>Login</p>
      </div>

      <form method="post" className={classes.form} onSubmit={handleFormSubmit}>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div className={classes["outer-link"]}>
        <p>
          Don't have an account? <Link to="/signup">Sign up </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
