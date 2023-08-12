import { useState } from "react";
import { FiChevronDown as DownBtn, FiChevronUp as UpBtn } from "react-icons/fi";

import classes from "./DropDown.module.css";

const DropDown = (props) => {
  const [check, setCheck] = useState(false);

  // open and closes the drop down upon click
  const clickHandler = () => {
    setCheck(!check);
  };

  // Bring bullets when dropDown is opened and contain more than one list item
  const isList = (arr) => {
    if (arr.length > 1) {
      return true;
    }
    return false;
  };

  // button symbol
  let btnSymbol = <DownBtn size={25} />;
  if (check) {
    btnSymbol = <UpBtn size={25} />;
  }

  let headingClass = `${classes.heading} ${check ? classes.active : ""}`;
  let keyFeaturesClass = `${classes["key-features"]} ${
    isList(props.keyFeatures) ? classes.list : ""
  }`;

  //  Data visible after dropDown is clicked
  let dropDownData = "";
  if (check) {
    dropDownData = (
      <ul className={keyFeaturesClass}>
        {props.keyFeatures.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={classes["drop-down"]} onClick={clickHandler}>
      <div className={headingClass}>
        <p>{props.heading}</p>
        <button onClick={clickHandler}>{btnSymbol}</button>
      </div>

      {dropDownData}
    </div>
  );
};

export default DropDown;
