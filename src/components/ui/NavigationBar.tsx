import React from "react";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  backUrl?: string;
  title?: string;
  children?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const NavigationBar = (props: NavigationBarProps) => (
  <div className="flex items-center justify-between w-full px-8 py-6">
    <div className="min-w-20">
      {!!props.backUrl && (
        <Link to={props.backUrl}>
          <img
            className="cursor-pointer h-4"
            src="/left-arrow.png"
            alt="back-arrow"
          />
        </Link>
      )}
    </div>
    <h3 className="text-center font-semibold">{props.title}</h3>
    <div className="min-w-20 flex justify-end">{props.rightAction}</div>
  </div>
);

export default NavigationBar;
