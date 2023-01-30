import React from "react";
import { baseURL } from "../../constants";
import { ISharebuttonProps } from "../../models";

function ShareButton({ link }: ISharebuttonProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleButtonClick = () => {
    navigator.clipboard.writeText(baseURL + link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <span
      className={`btn btn__share ${isCopied ? "btn__copied" : ""}`}
      onClick={handleButtonClick}
    >
      Share
    </span>
  );
}

export default ShareButton;
