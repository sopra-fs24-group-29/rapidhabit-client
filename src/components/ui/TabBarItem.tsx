import clsx from "clsx";
import React from "react";

interface TabBarItemProps {
  children?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabBarItem = (props: TabBarItemProps) => {
  <div
    className={clsx(
      "font-semibold p-2",
      props.isActive && "bg-dark-green rounded-2xl text-light-green"
    )}
    onClick={props.onClick}
  >
    {props.children}
  </div>;
};

export default TabBarItem;
