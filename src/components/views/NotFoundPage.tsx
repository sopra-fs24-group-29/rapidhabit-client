import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <BaseContainer>
    <div className="content">
      <h1>Page Not Found</h1>
      <p>The page you&apos;re looking for does not seem to exist</p>
      <Link to="/">Go back</Link>
    </div>
  </BaseContainer>
);

export default NotFoundPage;
