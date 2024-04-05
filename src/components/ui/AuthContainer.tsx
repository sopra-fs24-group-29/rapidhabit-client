import React from "react";

interface AuthContainerProps {
  children?: React.ReactNode;
}

const AuthContainer = (props: AuthContainerProps) => (
  <div className="h-full flex items-center justify-center">
    <div className="flex flex-col gap-8 lg:gap-12 text-center">
      {props.children}
    </div>
  </div>
);

export default AuthContainer;
