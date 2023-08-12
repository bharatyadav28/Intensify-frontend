import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import classes from "./VerifyUser.module.css";
import favicon from "../../assests/favicon.png";
import LoadingPage from "../../pages/LoadingPage";
import { MutatingDotsSpinner as LoadingSpinner } from "../UI/LoadingSpinner";

// Page to verify user email
const VerifyUser = () => {
  const [data, setData] = useState(null);
  const { isLoading, error, dbConnect } = useHttp();

  const navigate = useNavigate();

  // retreive data from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // send data through req body when page loads
  useEffect(() => {
    const postRequest = (data) => {
      setData(data.msg);
    };

    const url = `/api/v1/auth/verify-email?email:${email}&token:${token}`;

    dbConnect(
      {
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { email, verificationToken: token },
      },
      postRequest
    );
  }, []);

  // response after verfication

  const handleClick = () => {
    navigate("/login");
  };

  let content = "";
  if (data) {
    content = (
      <>
        <p>{data}</p>
        <div>
          <button onClick={handleClick}>Please Login</button>
        </div>
      </>
    );
  }
  if (error) {
    content = (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      {isLoading && (
        <LoadingPage>
          <LoadingSpinner />
        </LoadingPage>
      )}
      {!isLoading && (
        <div className={classes.icon}>
          <img src={favicon} />
          <h4 className={classes["site-name"]}>Intensify</h4>
        </div>
      )}
      {!isLoading && <div className={classes.response}>{content}</div>}
    </>
  );
};

export default VerifyUser;
