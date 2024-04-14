import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [groups, setGroups] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/groups`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setGroups(response.data);
      } catch (error) {
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
    <BaseContainer>
      <h1 className="text-center text-4xl flex items-start pd p-6 font-bold pb-10">
        {groups}
      </h1>
      <div>
        <div className="flex  flex-col ">
          <div className="flex flex-col bg-dark-green p-6 m-5 rounded-lg mb-1">
            <div className="flex flex-row justify-between">
              <div className="font-bold">24🔥</div>
              <div>
                <div>Current rank</div>
                <div className="font-bold">1st👑</div>
              </div>
            </div>

            <div className="text-xl font-bold">🏐Volleyball</div>
            <div className="flex justify-end gap-1.5">
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-dark-green p-6 m-5 rounded-lg mb-1">
            <div className="flex flex-row justify-between">
              <div className="font-bold">24🔥</div>
              <div>
                <div>Current rank</div>
                <div className="font-bold">1st👑</div>
              </div>
            </div>

            <div className="text-xl font-bold">🏐Volleyball</div>
            <div className="flex justify-end gap-1.5">
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
              <div className="rounded-full bg-light-green w-8 h-8 ">
                <text className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                  RO
                </text>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-col bg-input p-6 m-5 mr-1 rounded-lg mb-1">
            <div className="flex justify-center font-bold text-2xl">+</div>
            <div className="flex justify-center font-semibold text-m text-a text-center">
              start new group
            </div>
          </div>
          <div className="flex-col bg-input p-6 m-5 rounded-lg mb-1">
            <div className="flex justify-center font-bold text-2xl">+</div>
            <div className="flex justify-center font-semibold text-m text-a text-center">
              join with code
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default DashboardPage;
