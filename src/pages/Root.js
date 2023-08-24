import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";

import NavBar from "../components/header/NavBar";
import MyOffcanvas from "../components/UI/Offcanvas";
import Footer from "../components/header/Footer";

const Root = ({ clearLoginStorage }) => {
  const [showOffcanvas, setShowOffCanvas] = useState(true);

  const handleOffCampus = () => {
    setShowOffCanvas(false);
  };

  return (
    <Container fluid>
      {showOffcanvas && (
        <Row>
          <MyOffcanvas hideOffcanvas={handleOffCampus} />
        </Row>
      )}
      <Row>
        <NavBar clearLoginStorage={clearLoginStorage} />
      </Row>
      <Row>
        <Outlet />
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Root;
