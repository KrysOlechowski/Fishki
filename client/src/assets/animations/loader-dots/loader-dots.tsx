import React from "react";
import "./loader-dots.scss";

type Props = {
  color: string;
};

export const LoaderDots = ({ color }: Props) => {
  const style = {
    backgroundColor: color,
  };
  return (
    <div className="loading-dots">
      <div className="loading-dots--dot" style={style}></div>
      <div className="loading-dots--dot" style={style}></div>
      <div className="loading-dots--dot" style={style}></div>
    </div>
  );
};
