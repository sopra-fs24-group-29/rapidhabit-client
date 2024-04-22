import { api } from "../../helpers/api.ts";

interface SettingsUserProps {
  userId: string;
  userName: string;
  groupId: string;
}

const SettingsUserBox = (props: SettingsUserProps) => {

  const deleteUser = async () => {
    try {
      await api.delete(`/groups/${props.groupId}/users/${props.userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("user removed successfully")
      window.location.reload();
    } catch (error) {
      console.error("Error removing user from group:", error);
    }
  }

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
          {props.userName}
        </div>
      </div>
      <div className="pr-4">
        <img
          className="h-3 w-3 cursor-pointer"
          src="/cross.png"
          alt="delete icon"
          onClick={deleteUser}
        />
      </div>
    </div>
  );
};

export default SettingsUserBox;