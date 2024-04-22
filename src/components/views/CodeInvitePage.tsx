import BaseContainer from "../ui/BaseContainer.tsx";
import TabBar from "../ui/Tabbar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../helpers/api.ts";

const CodeInvitePage = () => {
  const navigate = useNavigate();
  const groupId = useParams();
  const accessCode = "GJ8ICU6v"

  useEffect(() => {
    const fetchInviteCode = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Response:", response);
      } catch (error) {
        console.error("Error fetching group information:", error);
      }
    };

    fetchInviteCode();
  }, );

  return (
    <div>
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">

          <div className="flex items-center justify-between w-full">
            <img
              onClick={() => navigate("/app")}
              className="cursor-pointer h-4"
              src="/left-arrow.png"
              alt="back-arrow"
            />
            <h3 className="text-center">Code</h3>
            <h3></h3>
          </div>

          <div>
            <h3 className="mt-20 text-center">Other people can join this group by using this code.</h3>
          </div>
          <div>
            <h3 className="mt-5 text-5xl">{accessCode}</h3>
          </div>
          <div>
            <button
              className="cursor-pointer mt-8 text-sm text-accent p-2 outline outline-accent
              rounded-lg flex items-center transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <img src="/clipboard.png" alt="copy-icon" className="w-5 h-5 mr-2" />
              <span>COPY</span>
            </button>
          </div>

        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default CodeInvitePage;