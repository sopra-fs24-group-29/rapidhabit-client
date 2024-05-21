import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button.tsx";
import NavigationBar from "components/ui/NavigationBar.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../ui/FormField.tsx";
import { api } from "../../helpers/api.ts";

const UpdateGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        console.log(response)
        const { name, description } = response.data;
        setGroupName(name);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching group information:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  const updateGroup = async () => {
    try {
      await api.put(
        `/groups/${groupId}`,
        {
          name: groupName,
          description: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Group updated successfully!");
      navigate(`/app/${groupId}`);
    } catch (error) {
      console.error("Error updating group:", error);
      alert(
        "The group could not be updated. Check if all fields are filled correctly."
      );
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateGroup();
    }
  };

  return (
    <BaseContainer>
      <NavigationBar
        backUrl={`/app/${groupId}/settings`}
        title="Update group"
        rightAction={
          <Button variant="text" onClick={updateGroup} className="hover:text-accent">
            Update
          </Button>
        }
      />
      <div className="flex flex-col items-center justify-start mt-8">
        <div className="w-full px-8">
          <h3 className="py-2">Name of group</h3>
          <FormField
            value={groupName}
            onChange={setGroupName}
            maxLength={50}
            onKeyDown={handleKeyPress}
          />

          <h3 className="py-2">Description</h3>
          <FormField
            value={description}
            onChange={setDescription}
            maxLength={300}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </BaseContainer>
  );
};

export default UpdateGroupPage;
