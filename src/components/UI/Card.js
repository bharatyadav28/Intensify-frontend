import classes from "./Card.module.css";

const Card = ({ children, className }) => {
  const cardClasses = `${classes.card} ${className}`;
  return <div className={cardClasses}>{children}</div>;
};

export default Card;
