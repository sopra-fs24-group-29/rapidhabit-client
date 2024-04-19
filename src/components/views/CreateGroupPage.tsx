import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api.ts";
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
      const response = await api.post("/groups", requestBody, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      alert(response.data);

      navigate("/app");
    } catch (error) {
      console.log("Something went wrong during the login: ", error);
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="flex flex-col items-center justify-start mt-8">
        <div>
          <h3 className="text-left  mt-5">Groupname</h3>
          <FormField
            type="text"
            label=""
            value={groupName}
            onChange={(un: string) => setGroupName(un)}
          />
          <h3 className="text-left  mt-3">Description</h3>
          <FormField
            type="text"
            label=""
            value={description}
            onChange={(un: string) => setDescription(un)}
          />
        </div>
        <button
          className="flex mt-5 bg-yellow-900 rounded-md"
          onClick={() => createGroup()}
        >
          confirm
        </button>
      </div>
    </BaseContainer>
  );
};

export default CreateGroupPage;
