import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-14 lg:gap-48 justify-center fixed bottom-0 w-full bg-input p-8 text-white text-center">
      <div className="px-4 cursor-pointer" onClick={() => navigate("/app")}>
        <div className="text-xs">icon</div>
        <div className="text-xs">Home</div>
      </div>
      <div className="px-4 cursor-pointer" onClick={() => navigate("/feed")}>
        <div className="text-xs">icon</div>
        <div className="text-xs">Feed</div>
      </div>
      <div className="px-4 cursor-pointer" onClick={() => navigate("/profile")}>
        <div className="text-xs">icon</div>
        <div className="text-xs">Profile</div>
      </div>
    </div>
  );
};

export default TabBar;
