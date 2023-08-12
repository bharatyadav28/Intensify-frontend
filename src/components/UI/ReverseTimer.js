import { useEffect, useState } from "react";

const countDownDate = new Date().getTime() + 60 * 60 * 5 * 1000;
var now = new Date().getTime();
var distance = countDownDate - now;
const ReverseTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    let intervalId = setInterval(() => {
      distance = distance - 1000;

      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
      // console.log(now, distance);

      if (distance <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      // console.log("Cleanup");
      return clearInterval(intervalId);
    };
  }, []);

  return (
    <span>
      in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s{" "}
    </span>
  );
};

export default ReverseTimer;
