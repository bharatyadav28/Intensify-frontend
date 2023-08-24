import classes from "./MyLearning.module.css";
import { useGetMylearningQuery } from "../../store/apis/mylearning-api";
import MyLearningItem from "./MyLearningItem";
import EmptyCart from "../cart/EmptyCart";
import { LoadingSubPage } from "../../pages/LoadingPage";
import { BarsSpinner } from "../UI/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const MyLearnings = () => {
  const { data, error, isFetching } = useGetMylearningQuery();

  let content = "";

  if (isFetching) {
    content = (
      <LoadingSubPage>
        <BarsSpinner />
      </LoadingSubPage>
    );
  } else if (data?.count === 0 || !data?.count) {
    content = (
      <div className="d-flex ms-3 me-2 ">
        <EmptyCart desc="No enrolled course." />{" "}
      </div>
    );
  } else {
    content = (
      <div className={classes.main}>
        {data?.courses?.map((course) => (
          <MyLearningItem key={course._id} item={course} />
        ))}
      </div>
    );
  }

  if (error) {
    content = <ErrorPage msg="Something went wrong. Please try again." />;
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
