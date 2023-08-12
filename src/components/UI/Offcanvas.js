import { BsX as CloseIcon } from "react-icons/bs";

import classes from "./Offcanvas.module.css";

import ReverseTimer from "./ReverseTimer";

function MyOffCanvas(props) {
  return (
    <div className={`  ${classes.offcanvas}  d-flex`}>
      <div className=" d-flex flex-column align-items-center flex-grow-1  p-2">
        <p className="mb-0  ">
          <strong>Personal Plan</strong>| Accelerate your career with access to
          8,000 of our top courses.
        </p>
        <p className="mb-0">Learn more.</p>
        <p className="mb-0">
          <strong>
            Ends (<ReverseTimer />) .
          </strong>
        </p>
      </div>
      <div>
        <CloseIcon onClick={props.hideOffcanvas} size={30} />
      </div>
    </div>
  );
}

export default MyOffCanvas;
