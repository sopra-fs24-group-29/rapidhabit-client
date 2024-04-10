import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <BaseContainer>
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-accent text-4xl">Page Not Found</h1>
      <p>The page you&apos;re looking for does not seem to exist</p>
      <Link to="/" className="hover:underline">Go back</Link>
    </div>
  </BaseContainer>
);

export default NotFoundPage;
