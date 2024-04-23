import NavigationBar from "components/ui/NavigationBar.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../helpers/api.ts";
import BaseContainer from "../ui/BaseContainer.tsx";
import TabBar from "../ui/Tabbar.tsx";

const CodeInvitePage = () => {
  const { groupId } = useParams();
  const [accessCode, setAccessCode] = useState<string>();
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchInviteCode = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setAccessCode(response.data.accessCode);
      } catch (error) {
        console.error("Error fetching group information:", error);
      }
    };

    fetchInviteCode();
  }, [groupId]);

  const copyCode = () => {
    if (!accessCode) return;
    window.navigator.clipboard.writeText(accessCode);
    setHasCopied(true);
  };

  return (
    <div>
      <BaseContainer>
        <NavigationBar backUrl={`/app/${groupId}/settings`} title="Invite" />
        <div className="flex flex-col items-center justify-start mt-8">
          <div>
            <h3 className="mt-20 text-center">
              Other people can join this group by using this code.
            </h3>
          </div>
          <div>
            <h3 className="mt-5 text-5xl">{accessCode}</h3>
          </div>
          <div>
            <button
              className="cursor-pointer mt-8 text-sm text-accent p-2 outline outline-accent
              rounded-lg flex items-center transform hover:translate-x-0.5 hover:translate-y-0.5 transition-transform uppercase"
              onClick={copyCode}
            >
              <img
                src="/clipboard.png"
                alt="copy-icon"
                className="w-5 h-5 mr-2"
              />
              <span>{hasCopied ? "Copied to clipboard" : "Copy"}</span>
            </button>
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default CodeInvitePage;
