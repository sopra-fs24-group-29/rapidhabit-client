import BaseContainer from "components/ui/BaseContainer";
import NavigationBar from "components/ui/NavigationBar.tsx";
import TabBar from "../ui/Tabbar.tsx";
import { useParams } from "react-router-dom";

const DeleteGroupPage = () => {
  const { groupId } = useParams();

  return (
    <div>
      <BaseContainer>
        <NavigationBar
          backUrl="/app/${groupId}"
          title="Delete group"
          rightAction={
            <button
              className="text-white font-bold"
              type="button"
            >
              Confirm
            </button>
          }
        />
        <div className="flex flex-col items-center justify-start mt-8">

        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default DeleteGroupPage;
