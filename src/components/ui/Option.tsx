import clsx from "clsx";
import React from "react";

interface OptionProps {
  isSelected?: boolean;
  onSelect?: () => void;
  children?: React.ReactNode;
}

const Option = (props: OptionProps) => (
  <button
    onClick={props.onSelect}
    className={clsx(
      "px-3 py-2 rounded-lg my-2",
      props.isSelected
        ? "bg-light-green text-black"
        : "bg-dark-green text-white"
    )}
  >
    {props.children}
  </button>
);

export default Option;
