import Carousel from "react-bootstrap/Carousel";

import classes from "./carousel.module.css";

const MyCarousel = ({ items }) => {
  return (
    <Carousel fade className={`${classes.mycarousel} ps-0 pe-0 `}>
      {items?.map((item, index) => (
        <Carousel.Item
          className={`${classes.item} `}
          interval={4000}
          key={index}
        >
          <img
            className="d-block w-100"
            src={item.image}
            alt={"Slide " + index}
          />
          <Carousel.Caption className={classes.caption}>
            <h3>{item.caption} </h3>
            <p>{item.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
