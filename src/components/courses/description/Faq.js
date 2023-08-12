import React from "react";

import DropDown from "./DropDown";
import classes from "./Curriculum.module.css";

// Frequently asked questions
const Faq = (props) => {
  return (
    <div>
      {props.data.map((value, index) => (
        <DropDown
          key={index}
          heading={value.question}
          keyFeatures={[value.answer]}
        />
      ))}
    </div>
  );
};

export default Faq;
