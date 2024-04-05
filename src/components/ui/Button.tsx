import React from "react";
import "../../styles/ui/Button.scss";

interface ButtonProps extends React.ComponentProps<"button"> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

export const Button = (props: ButtonProps) => (
  <button
    {...props}
    style={props.style}
    className={`primary-button ${props.className}`}
  >
    {props.children}
  </button>
);
