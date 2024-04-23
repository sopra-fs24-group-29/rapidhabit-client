import { AxiosError } from "axios";
import BaseContainer from "components/ui/BaseContainer";
import GroupSection from "components/ui/Group";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { Group } from "models/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [groups, setGroups] = useState<Group[]>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/groups`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setGroups(response.data || []);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          // User session expired
          localStorage.removeItem("token");
          return navigate("/");
        }
        console.error(
          `Something went wrong while fetching the profile: \n${handleError(
            error
          )}`
        );
        alert(
          "Something went wrong while loading the profile! See the console for details."
        );
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <BaseContainer>
        <h1 className="text-center text-4xl flex items-start pd p-6 font-bold pb-10">
          Groups
        </h1>
        <div>
          <div className="flex flex-col">
            {groups?.map((group) => (
              <GroupSection
                key={group.id}
                name={group.name}
                id={group.id}
                streak={group.streaks}
                currentRank={group.currentRank}
                initials={group.userInitials}
              />
            ))}
          </div>
          <div className="flex flex-row pb-20">
            <button
              className="flex-col bg-input p-6 m-5 mr-1 rounded-lg mb-1"
              onClick={() => navigate("/app/new-group")}
            >
              <div className="flex justify-center font-bold text-2xl">+</div>
              <div className="flex justify-center font-semibold text-m text-a text-center">
                start new group
              </div>
            </button>
            <div
              className="flex-col bg-input p-6 m-5 rounded-lg mb-1"
              onClick={() => navigate("/join")}
            >
              <div className="flex justify-center font-bold text-2xl">+</div>
              <div className="flex justify-center font-semibold text-m text-a text-center">
                join with code
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default DashboardPage;
