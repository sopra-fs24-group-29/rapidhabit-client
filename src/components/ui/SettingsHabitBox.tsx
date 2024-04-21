import { useEffect, useState } from "react";
import { api } from "../../helpers/api.ts";

interface SettingsHabitProps {
  habitId: string;
  groupId: string;
}

const SettingsHabitBox = (props: SettingsHabitProps) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const response = await api.get(`/groups/${props.groupId}/habits/${props.habitId}`);
        console.log("Response:", response);
        const { name } = response.data;
        setName(name);
        console.log(name)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchHabitDetails();
  }, [props.habitId, props.groupId]);

  return (
    <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
      <div className="flex items-center">
        <div className="pl-4">
          <img
            className="h-7 w-7"
            src="/habit.png"
            alt="habit icon"
          />
        </div>
        <div className="ml-4 text-base">
          {name}
        </div>
      </div>
      <div className="pr-4">
        <img
          className="h-3 w-3 cursor-pointer"
          src="/cross.png"
          alt="delete icon"
        />
      </div>
    </div>
  );
};

export default SettingsHabitBox;