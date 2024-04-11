import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <BaseContainer>
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-accent text-4xl lg:text-7xl lg:font-semibold">Page Not Found</h1>
      <p className="text-sm mt-2 lg:text-2xl">The page you&apos;re looking for does not seem to exist</p>
      <Link to="/" className="mt-4 hover:underline lg:text-2xl">Go back</Link>
    </div>
  </BaseContainer>
);

export default NotFoundPage;
