import classes from "./ErrorPageContent.module.css";

const ErrorPageContent = ({ title, children }) => {
  return (
    <div className={classes["error-page"]}>
      <h4>{title}</h4>
      <p className="mt-2">{children}</p>
    </div>
  );
};

export default ErrorPageContent;
