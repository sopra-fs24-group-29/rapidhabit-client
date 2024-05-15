import BaseContainer from "components/ui/BaseContainer";
import NavigationBar from "components/ui/NavigationBar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../helpers/api.ts";
import TabBar from "../ui/Tabbar.tsx";

const DeleteGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const deleteGroup = async () => {
    try {
      await api.delete(`/groups/${groupId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log("Group deleted successfully!");
      navigate("/app");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <div>
      <BaseContainer>
        <NavigationBar
          backUrl={`/app/${groupId}/settings`}
          title="Delete group"
          rightAction={
            <button
              className="text-white font-bold hover:text-accent"
              type="button"
              onClick={deleteGroup}
            >
              Confirm
            </button>
          }
        />
        <div className="flex flex-col text-left p-6 ">
          <p>Are you sure you want to delete this group?</p>
          <p>
            All data associated with this group will be permanently deleted!
          </p>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default DeleteGroupPage;
