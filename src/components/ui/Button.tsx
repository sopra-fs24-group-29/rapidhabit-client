import clsx from "clsx";
import React from "react";
import "../../styles/ui/Button.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

export const Button = (props: ButtonProps) => (
  <button
    {...props}
    style={props.style}
    className={clsx("primary-button", props.className)}
  >
    {props.children}
  </button>
);
