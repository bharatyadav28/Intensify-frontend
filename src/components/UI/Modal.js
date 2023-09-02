import { createPortal } from "react-dom";
import Transition from "react-transition-group/Transition";

import classes from "./Modal.module.css";

const ModalContainer = ({ onClose, transitionState, className, children }) => {
  const modalClasses = [
    classes.container,
    className,
    transitionState === "entering"
      ? classes["show-modal"]
      : transitionState === "exiting"
      ? classes["hide-modal"]
      : null,
  ];

  return <div className={modalClasses.join(" ")}>{children}</div>;
};

const BackDrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const Modal = ({ onClose, showModal, className, children }) => {
  const domNode = document.getElementById("modal");
  return (
    <Transition in={showModal} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <>
          {createPortal(<BackDrop onClose={onClose} />, domNode)}
          {createPortal(
            <ModalContainer
              onClose={onClose}
              transitionState={state}
              className={className}
              children={children}
            />,
            domNode
          )}
        </>
      )}
    </Transition>
  );
};

export default Modal;
