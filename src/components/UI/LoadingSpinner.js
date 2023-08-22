import {
  Triangle,
  MutatingDots,
  Bars,
  Watch,
  Oval,
} from "react-loader-spinner";
import React from "react";

const TriangleSpinner = ({ marginClasses }) => {
  let classes = marginClasses || "mx-auto mt-5";
  return (
    <div className="d-flex justify-content-center mt-5">
      <Triangle
        height="80"
        width="80"
        color="#404040"
        ariaLabel="triangle-loading"
        wrapperStyle={{ mx: "auto" }}
        // wrapperClassName="mx-auto"
        visible={true}
      />
    </div>
  );
};

const MutatingDotsSpinner = ({ marginClasses }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${marginClasses}`}
    >
      <MutatingDots
        height="100"
        width="100"
        color="#260c1a"
        secondaryColor="#260c1a"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

const BarsSpinner = ({ marginClasses }) => {
  let classes = marginClasses || "mx-auto mt-5";
  return (
    <div>
      <Bars
        height="80"
        width="70"
        color="#282828"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

const ClockSpinner = ({ marginClasses }) => {
  let classes = marginClasses || "mx-auto mt-5";
  return (
    <div>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#282828"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

const OvalSpinner = ({ width, height }) => {
  return (
    <div>
      <Oval
        height={height}
        width={width}
        color="#282828"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export {
  TriangleSpinner,
  MutatingDotsSpinner,
  BarsSpinner,
  ClockSpinner,
  OvalSpinner,
};
