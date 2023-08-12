import ReactDom from "react-dom";
import { Transition } from "react-transition-group";

import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={classes["back-drop"]} onClick={props.onClose}></div>;
};

// Main modal content
const ModalOverLay = (props) => {
  const modalClasses = [
    classes["modal-overlay"],
    props.className,
    props.state === "entering"
      ? classes["modal-open"]
      : props.state === "exiting"
      ? classes["modal-close"]
      : null,
  ];
  return <div className={modalClasses.join(" ")}>{props.children}</div>;
};

const portalElement = document.getElementById("modal");

// Main modal content and Backdrop
const Modal = (props) => {
  return (
    <Transition in={props.showModal} timeout={500} mountOnEnter unmountOnExit>
      {(state) => {
        return (
          <>
            {ReactDom.createPortal(
              <BackDrop onClose={props.onClose} />,
              portalElement
            )}
            {ReactDom.createPortal(
              <ModalOverLay
                onClose={props.onClose}
                className={props.className}
                state={state}
              >
                {props.children}
              </ModalOverLay>,
              portalElement
            )}
          </>
        );
      }}
    </Transition>
  );
};

export default Modal;
