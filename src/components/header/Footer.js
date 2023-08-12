import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";

import IntensifyPic from "../../assests/IntensifyPic.jpg";

const Footer = () => {
  return (
    <Container className={classes.footer}>
      <Row>
        <Col className={classes.cateog}>
          <ul>
            <li>
              <Link>About Us</Link>
            </li>
            <li>
              <Link>Contact Us</Link>
            </li>
            <li>
              <Link>Community</Link>
            </li>
            <li>
              <Link>Student Perks</Link>
            </li>

            <li>
              <Link>Carrers</Link>
            </li>
          </ul>
        </Col>

        <Col className={classes.cateog}>
          <ul>
            <li>
              <Link>Carrer</Link>
            </li>
            <li>
              <Link>Blog</Link>
            </li>
            <li>
              <Link>Help and Support</Link>
            </li>
            <li>
              <Link>Affilate</Link>
            </li>

            <li>
              <Link>Investors</Link>
            </li>
          </ul>
        </Col>

        <Col className={classes.cateog}>
          <ul>
            <li>
              <Link>Terms</Link>
            </li>
            <li>
              <Link>Privacy policy</Link>
            </li>
            <li>
              <Link>Cookie setting</Link>
            </li>
            <li>
              <Link>Sitemap</Link>
            </li>

            <li>
              <Link>Accessibility statement</Link>
            </li>
          </ul>
        </Col>

        <Col className={classes.cateog}>
          <Row>
            <img src={IntensifyPic} />
          </Row>
          <Row>
            <div className="d-flex justify-content-between mx-1">
              <BsFacebook />
              <BsInstagram />
              <BsTwitter />
              <BsLinkedin />
              <BsYoutube />
            </div>
          </Row>
        </Col>
      </Row>

      <Row>
        <div className={classes.copyright}>
          <p>Copright @ 2023 Intensify</p>
        </div>
      </Row>
    </Container>
  );
};

export default Footer;
