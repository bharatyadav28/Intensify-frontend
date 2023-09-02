import { useEffect, useState, useRef } from "react";
import { useSubmit, useLocation } from "react-router-dom";
import { FormControl, InputGroup } from "react-bootstrap";
import { BsSearch as SearchIcon } from "react-icons/bs";

import classes from "./SearchInput.module.css";
import { getSearchParams } from "../../utlils/index";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("-1");

  const inputRef = useRef();

  const submit = useSubmit();
  const location = useLocation();

  const handleChangeInput = (events) => {
    setInputValue(events.target.value);
  };

  useEffect(() => {
    if (inputValue !== "-1") {
      inputRef.current = inputValue;

      const { searchParams, paramValue: search } = getSearchParams({
        location,
        paramKey: "search",
      });

      const page = searchParams.get("page");

      // const { paramValue: page } = getSearchParams({
      //   location,
      //   paramKey: "page",
      // });

      if (search || search === "") {
        searchParams.delete("search");
      }
      if (page || page === "") {
        searchParams.delete("page");
      }

      if (inputRef.current) {
        searchParams.append("search", inputRef.current);
      }
      searchParams.append("page", "1");

      const interval = setTimeout(() => submit(searchParams), 500);

      return () => clearInterval(interval);
    }
  }, [inputValue]);

  // set inpuut field value
  const value = () => {
    const { paramValue: search } = getSearchParams({
      location,
      paramKey: "search",
    });

    let val = inputValue === "-1" ? "" : inputValue;
    if (inputValue === "-1" && search) {
      val = search;
    }
    return val;
  };

  return (
    <InputGroup className={classes["group"]}>
      <InputGroup.Text
        id="basic-addon1"
        className={`${classes.icon}  bg-white`}
      >
        <SearchIcon />
      </InputGroup.Text>

      <FormControl
        type="text"
        placeholder="Search for anything"
        aria-describedby="basic-addon1"
        className={classes.input}
        value={value()}
        onChange={handleChangeInput}
      />
    </InputGroup>
  );
};

export default SearchInput;
