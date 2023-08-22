import { useRouteError } from "react-router-dom";

import ErrorPageContent from "../components/ErrorPageContent";

const ErrorPage = () => {
  let error = useRouteError();

  let title = "Error";
  let message = "An error occured";

  // console.log("error", error);

  if (error && error.status === 404) {
    title = "Not Found!!!";
    message = "Page not found";
  }

  if (error && error.status === 500) {
    message = error.data.message;
  }

  return <ErrorPageContent title={title}> {message} </ErrorPageContent>;
};

export default ErrorPage;
