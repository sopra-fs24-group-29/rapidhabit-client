import BaseContainer from "components/ui/BaseContainer";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const userId = "661bd7195901c75b6c4ff211"
  return (
    <BaseContainer>
    <h1 className="text-center text-4xl">Dashboard</h1>
    <div>
      <Link to={`/profile/${userId}`}>Profile</Link>
    </div>
  </BaseContainer>
  );
}

export default DashboardPage;
