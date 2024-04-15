import BaseContainer from "components/ui/BaseContainer";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { Group } from "models/Group";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setGroup(response.data || []);
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
    <div>
      <BaseContainer>
        <h1 className="text-center text-4xl flex items-start pd p-6 font-bold pb-10">
          {group?.name}
        </h1>
        <div className="grid grid-cols-2 p-4 gap-4">
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
        <div className="flex flex-row gap-7 justify-center pt-6">
          <div className="font-semibold bg-dark-green p-2 rounded-2xl text-light-green">
            Your Activity
          </div>
          <div className="font-semibold p-2">Ranking</div>
          <div className="font-semibold p-2">Chat</div>
        </div>
        <div className="pt-6 pl-6 font-semibold">2023</div>
        <div className="flex flex-wrap w-[350px] gap-1 pt-3 px-7">
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
        </div>
        <div className="pt-6 pl-6 font-semibold">2023</div>
        <div className="flex flex-wrap w-[350px] gap-1 pt-3 px-7">
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
          <div className="w-2 h-2 bg-light-green m-[1px]"></div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

const GroupCard = () => (
  <div className="bg-dark-green p-4 rounded-lg">
    <div className="flex flex-row justify-between">
      <div>3🔥</div>
      <div>☑️</div>
    </div>
    <div className="pt-6 pb-2 text-xl font-bold truncate">Workout</div>
    <div className="flex justify-end gap-1.5">
      <div className="rounded-full bg-light-green w-7 h-7 ">
        <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
          RO
        </span>
      </div>
      <div className="rounded-full bg-light-green w-7 h-7 ">
        <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
          RO
        </span>
      </div>
      <div className="rounded-full bg-light-green w-7 h-7 ">
        <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
          RO
        </span>
      </div>
    </div>
  </div>
);

export default GroupDetail;
