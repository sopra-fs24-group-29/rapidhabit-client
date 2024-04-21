import { useEffect, useState } from "react";
import { api } from "../../helpers/api.ts";

interface SettingsUserProps {
  userId: string;
}

const SettingsUserBox = (props: SettingsUserProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/users/${props.userId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("Response:", response);
        const { firstname, lastname } = response.data;
        setFirstName(firstname);
        setLastName(lastname);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [props.userId]);

  return (
    <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
      <div className="flex items-center">
        <div className="pl-4">
          <img
            className="h-7 w-7"
            src="/user.png"
            alt="user icon"
          />
        </div>
        <div className="ml-4 text-base">
          {firstName} {lastName}
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

export default SettingsUserBox;