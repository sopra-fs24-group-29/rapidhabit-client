import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button.tsx";
import NavigationBar from "components/ui/NavigationBar.tsx";
import { api } from "helpers/api.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../ui/FormField.tsx";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createGroup = async () => {
    try {
      const requestBody = JSON.stringify({
        name: groupName,
        description: description,
      });
      await api.post("/groups", requestBody, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      navigate("/app");
    } catch (error) {
      console.log("Something went wrong while creating: ", error);
      alert(
        "The group could not be created. Check if all fields are filled correctly."
      );
    }
  };

  return (
    <BaseContainer>
      <NavigationBar
        backUrl="/app"
        title="Create new group"
        rightAction={
          <Button variant="text" onClick={createGroup} className="hover:text-accent">
            Confirm
          </Button>
        }
      />
      <div className="flex flex-col items-center justify-start mt-8">
        <div className="w-full px-8">
          <h3 className="py-2">Name of group</h3>
          <FormField value={groupName} onChange={setGroupName} maxLength={50} />

          <h3 className="py-2">Description</h3>
          <FormField value={description} onChange={setDescription} maxLength={300} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default CreateGroupPage;
