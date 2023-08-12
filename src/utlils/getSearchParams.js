import { useSubmit, useLocation } from "react-router-dom";

// returns specific query param and array of all query params
const getSearchParams = ({ location, paramKey }) => {
  const searchParams = new URLSearchParams(location.search);
  const paramValue = searchParams.get(paramKey);

  return { searchParams, paramValue };
};

export default getSearchParams;
