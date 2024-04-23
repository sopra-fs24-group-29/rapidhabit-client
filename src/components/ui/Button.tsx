import clsx from "clsx";
import React from "react";
import "../../styles/ui/Button.css";

type ButtonVariant = "primary" | "text" | "destructive";

interface ButtonProps extends React.ComponentProps<"button"> {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export const Button = (props: ButtonProps) => (
  <button
    {...props}
    style={props.style}
    className={clsx(
      props.variant === "text"
        ? "text-button"
        : props.variant === "destructive"
        ? "primary-button destructive"
        : "primary-button",
      props.className
    )}
  >
    {props.children}
  </button>
);
