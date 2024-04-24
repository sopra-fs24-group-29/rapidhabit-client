import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button.tsx";
import NavigationBar from "components/ui/NavigationBar.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormField from "../ui/FormField.tsx";

const UpdateGroupPage = () => {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <BaseContainer>
      <NavigationBar
        backUrl={`/app/${groupId}/settings`}
        title="Update group"
        rightAction={
          <Button variant="text">
            Update
          </Button>
        }
      />
      <div className="flex flex-col items-center justify-start mt-8">
        <div className="w-full px-8">
          <h3 className="py-2">Name of group</h3>
          <FormField value={groupName} onChange={setGroupName} />

          <h3 className="py-2">Description</h3>
          <FormField value={description} onChange={setDescription} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default UpdateGroupPage;
