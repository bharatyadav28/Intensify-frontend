import { useEffect, useRef, useState } from "react";
import { useSubmit, useLocation } from "react-router-dom";

import CustomDropDown from "../UI/Dropdown";
import { getSearchParams } from "../../utlils/index";

const SortHandle = () => {
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef();

  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    if (selected) {
      selectedRef.current = selected;
      // const searchParams = new URLSearchParams(location.search);
      // const sort = searchParams.get("sort");

      const { searchParams, paramValue: sort } = getSearchParams({
        location,
        paramKey: "sort",
      });

      const page = searchParams.get("page");

      if (sort || sort === "") {
        searchParams.delete("sort");
      }
      if (page || page === "") {
        searchParams.delete("page");
      }

      searchParams.append("sort", selectedRef.current);
      searchParams.append("page", "1");

      submit(searchParams);
    }
  }, [selected]);

  const handleDropdownSelect = (events) => {
    setSelected(events);
  };

  const sortValue = () => {
    const { searchParams, paramValue: sort } = getSearchParams({
      location,
      paramKey: "sort",
    });
    return sort;
  };

  return (
    <CustomDropDown
      onSelect={handleDropdownSelect}
      title="Sort by"
      items={["latest", "oldest", "a-z", "z-a"]}
      selectedItem={sortValue()}
    />
  );
};

export default SortHandle;
