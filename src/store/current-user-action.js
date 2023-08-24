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
      dispatch(currentUserActions.loading(true));
      const data = await dbConnect();
      dispatch(currentUserActions.replaceUser(data));
    } catch (error) {
      dispatch(currentUserActions.fetchErrors(error.message));
    }
    dispatch(currentUserActions.loading(false));
  };
};

export default retreiveCurrentUser;
