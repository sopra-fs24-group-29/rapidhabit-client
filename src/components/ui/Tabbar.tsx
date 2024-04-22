import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/app");

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-row gap-14 lg:gap-48 justify-center fixed bottom-0 w-full bg-input p-4 text-white text-center">
      <div className="px-4 cursor-pointer" onClick={() => navigate("/app")}>
        <div>
          <img
            className="h-7 w-7"
            src={activeTab !== "/profile" && activeTab !== "/feed" ? "/onhome.png" : "/offhome.png"}
            alt="home tab icon"
          />
        </div>
        <div className={activeTab === "/app" ? "text-xs" : "text-xs text-tab-off"}>Home</div>
      </div>
      <div className="px-4 cursor-pointer" onClick={() => navigate("/feed")}>
        <div>
          <img
            className="h-7 w-7"
            src={activeTab === "/feed" ? "/onfeed.png" : "/offfeed.png"}
            alt="feed tab icon"
          />
        </div>
        <div className={activeTab === "/feed" ? "text-xs" : "text-xs text-tab-off"}>Feed</div>
      </div>
      <div className="px-4 cursor-pointer" onClick={() => navigate("/profile")}>
        <div>
          <img
            className="h-7 w-7"
            src={activeTab === "/profile" ? "/onprofile.png" : "/offprofile.png"}
            alt="profile tab icon"
          />
        </div>
        <div className={activeTab === "/profile" ? "text-xs" : "text-xs text-tab-off"}>Profile</div>
      </div>
    </div>
  );
};

export default TabBar;