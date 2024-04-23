import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button.tsx";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = async () => {
    const token = localStorage.getItem("token");
    if(token) {
      navigate("/app")
    } else {
      navigate("/");
    }
  }
  return (
  <BaseContainer>
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-accent text-4xl lg:text-7xl lg:font-semibold">Page Not Found</h1>
      <p className="text-sm mt-2 lg:text-2xl">The page you&apos;re looking for does not seem to exist</p>
      <div>
        <Button
          className="cursor-pointer py-1 px-4 mt-5 text-accent bg-black outline outline-accent"
          onClick={goBack}
        >
          Go back
        </Button>
      </div>
    </div>
  </BaseContainer>
  );
}

export default NotFoundPage;
