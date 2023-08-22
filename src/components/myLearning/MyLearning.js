import classes from "./MyLearning.module.css";
import { useGetMylearningQuery } from "../../store/apis/mylearning-api";
import MyLearningItem from "./MyLearningItem";
import EmptyCart from "../cart/EmptyCart";

const MyLearnings = () => {
  const { data, error, isFetching } = useGetMylearningQuery();

  let content = "";
  if (data?.count === 0 || !data?.count) {
    content = <EmptyCart desc="No enrolled course." />;
  } else {
    content = (
      <div className={classes.main}>
        {data?.courses?.map((course) => (
          <MyLearningItem key={course._id} item={course} />
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column px-0 ">
      <div className={classes.heading}>
        <h1>My learning</h1>
      </div>
      {content}
    </div>
  );
};

export default MyLearnings;
