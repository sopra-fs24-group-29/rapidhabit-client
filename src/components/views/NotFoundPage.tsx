import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";
import "styles/views/NotFoundPage.scss";

const NotFoundPage = () => (
  <BaseContainer className="notFoundPage">
    <div className="content">
      <h1>Page Not Found</h1>
      <p>The page you&apos;re looking for does not seem to exist</p>
      <Link className="centeredLink" to="/">Go back</Link>
    </div>
  </BaseContainer>
);

export default NotFoundPage;
