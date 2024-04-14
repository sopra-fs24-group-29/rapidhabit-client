import { useNavigate } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-14 justify-center fixed bottom-0 w-full bg-input p-10 text-white text-center">
      <div className="px-4" onClick={() => navigate("/app")}>
        <div className="text-xs">icon</div>
        <div className="text-xs">Home</div>
      </div>
      <div className="px-4">
        <div className="text-xs">icon</div>
        <div className="text-xs">Home</div>
      </div>
      <div className="px-4" onClick={() => navigate("/profile")}>
        <div className="text-xs">icon</div>
        <div className="text-xs">Home</div>
      </div>
    </div>
  );
};

export default TabBar;
