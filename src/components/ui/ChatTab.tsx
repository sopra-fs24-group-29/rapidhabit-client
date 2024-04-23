import { Group } from "models/Group";

interface ChatTabProps {
  group: Group;
}

const ChatTab = (props: ChatTabProps) => (
  <div className="p-8">No chat messages</div>
);

export default ChatTab;
