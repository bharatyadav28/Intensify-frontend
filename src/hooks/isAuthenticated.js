import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useIsAuthenticated = () => {
  const [validUser, setValidUser] = useState(false);

  const user = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (user) {
      setValidUser(true);
    }
  }, [user]);

  return {
    validUser,
    setValidUser,
  };
};

export default useIsAuthenticated;
