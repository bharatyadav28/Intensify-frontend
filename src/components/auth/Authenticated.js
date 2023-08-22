import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { notifyError } from "../../utlils";

const Authenticated = ({ children }) => {
  const user = useSelector((state) => state.currentUser.user);

  if (!user) {
    notifyError("Please login first");
    return <Navigate to="/login" replace={true} />;
  }

  return <> {children} </>;
};

export default Authenticated;
