import { useEffect, useRef } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSubmit, useLocation } from "react-router-dom";

import { getSearchParams } from "../../utlils";

const PaginationUI = ({ totalItems }) => {
  const activePageRef = useRef(1); // currently active page
  const submit = useSubmit();
  const location = useLocation(); // current url

  //  value of page query param from url
  const { paramValue: page } = getSearchParams({
    location,
    paramKey: "page",
  });

  //  request of new page after click
  const handleClick = (number) => {
    // array of search or query params and value of page param
    const { searchParams, paramValue: page } = getSearchParams({
      location,
      paramKey: "page",
    });

    // delete previous "page" query param if exist
    if (page || page === "") {
      searchParams.delete("page");
    }
    searchParams.append("page", number);

    submit(searchParams);
  };

  let items = []; // pages number i.e 1,2,3
  const eachPageItems = 3; // number of items on each page
  let numOfPages = Math.ceil(totalItems / eachPageItems);

  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        className={number === Number(page) ? "disabled-btn" : ""}
        active={number === Number(page)}
        onClick={(events) => {
          events.target.className = "active";
          handleClick(number);
        }}
        value={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination size="sm">{items}</Pagination>;
};

export default PaginationUI;
