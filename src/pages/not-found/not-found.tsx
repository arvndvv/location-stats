import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/page-not-found.json";
import "./not-found.scss";

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const height =
    window.innerHeight > window.innerWidth
      ? window.innerWidth
      : window.innerHeight;
  return (
    <div className="notfound">
      <Lottie
        options={defaultOptions}
        height={height}
        width={window.innerWidth}
      />
    </div>
  );
}

export default NotFound;
