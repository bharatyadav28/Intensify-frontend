import { currentUserActions } from "./current-user";

const retreiveCurrentUser = () => {
  return async (dispatch) => {
    const dbConnect = async () => {
      const response = await fetch("/api/v1/users/showMe");

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.msg;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      return data;
    };

    try {
      const data = await dbConnect();
      dispatch(currentUserActions.replaceUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default retreiveCurrentUser;
