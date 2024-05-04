interface BaseContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const BaseContainer = (props: BaseContainerProps) => (
  <div
    {...props}
    className={`max-w-xl mx-auto h-full flex flex-col w-full ${
      props.className ?? ""
    }`}
  >
    {props.children}
  </div>
);

export default BaseContainer;
