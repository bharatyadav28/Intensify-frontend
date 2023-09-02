import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { isSixChars, notifyError, notifySuccess } from "../../utlils";
// import classes from "../auth/SignupForm.module.css";
import { OvalSpinner } from "../UI/LoadingSpinner";
import classes from "./AddReviewForm.module.css";

const AddReviewForm = ({ rating, user, course, setRating, onClose }) => {
  const {
    input,
    setInput,
    setInputTouched,
    inputIsValid,
    inputHasError,
    inputClasses,
    inputChangeHandler,
    inputBlurHandler,
  } = useInput(isSixChars);

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
      setRating(0);
      onClose();
    };

    const requiredConfig = {
      url: `/api/v1/reviews`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { ratings: rating, user, course, comment: input },
    };

    dbConnect(requiredConfig, postRequest);
    events.preventDefault();
  };

  const isFormValid = inputIsValid;

  return (
    <div className={`${classes.main} `} onSubmit={handleFormSubmit}>
      {/* <div className={classes.title}>
        <p>{reset ? "Reset Password" : "Forgot Password"}</p>
      </div> */}
      <form method="post" className={inputClasses.form}>
        <div className={classes["form-control"]}>
          {/* <label>{reset ? "Password" : "Email"}</label> */}
          <textarea
            value={input}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            className={inputClasses}
          />
          {inputHasError && (
            <p className={classes["error-msg"]}>Review is not valid</p>
          )}
        </div>

        <div className={classes.btns}>
          <button
            disabled={rating === 0 || isLoading || !isFormValid}
            type="submit"
          >
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <OvalSpinner height={20} width={20} />{" "}
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
