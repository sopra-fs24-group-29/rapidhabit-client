import BaseContainer from "components/ui/BaseContainer";
import TabBar from "../ui/Tabbar.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "helpers/api";

const JoinGroupPage = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");

  const doJoinGroup = async () => {
    try {
      const requestBody = {
        accessKey: inviteCode,
      };

      await api.post("groups/join", requestBody, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      console.log("correct invite code, joining group...")
      navigate("/app")
    } catch (error) {
      console.error("couldn't join the group: ", error);
      alert("wrong invite code, try again!")
    }
  };

  {/*@PostMapping("/groups/join") // defines a method to for handling post methods for creating new users
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public ResponseEntity<?> createUser(@RequestHeader("Authorization") String authHeader */}


  return (
    <div>
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div className="flex items-center justify-between w-full">

            <img
              onClick={() => navigate("/app")}
              className="cursor-pointer h-4"
              src="/left-arrow.png"
              alt="back-arrow"
            />
            <h3 className="text-center">Join group</h3>
            <button
              className="text-white font-bold"
              type="button"
              onClick={doJoinGroup}
            >
              Join
            </button>
          </div>

          <div>
            <h3 className="mt-20 text-center">Enter the code of the group</h3>
            <form className="flex items-center justify-center text-center">
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                className="bg-black text-5xl text-center mt-6"
                maxLength={8} // sets max number of characters to 6
                autoFocus // focus on input field when page loaded
                required  // required field to join group
                autoComplete="off" // no autocompletion in input field
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </form>
          </div>

        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default JoinGroupPage;