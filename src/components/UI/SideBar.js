import { Container } from "react-bootstrap";

import classes from "./SideBar.module.css";

const Sidebar = (props) => {
  const sidebarClasses = props.className + " " + classes.sidebar;
  return (
    <Container fluid className={sidebarClasses}>
      {props.children}
    </Container>
  );
};

export default Sidebar;
