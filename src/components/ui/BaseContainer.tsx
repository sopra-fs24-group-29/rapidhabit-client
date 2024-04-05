import "../../styles/ui/BaseContainer.scss";

interface BaseContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const BaseContainer = (props: BaseContainerProps) => (
  <div {...props} className={`base-container ${props.className ?? ""}`}>
    {props.children}
  </div>
);

export default BaseContainer;
