import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";
import "styles/views/NotFoundPage.scss";

const NotFoundPage = () => (
  <BaseContainer className="notFoundPage">
    <div className="content">
      <h2>Page Not Found</h2>
      <p>The page you&apos;re looking for does not seem to exist</p>
      <Link to="/">Go back</Link>
    </div>
  </BaseContainer>
);

export default NotFoundPage;
