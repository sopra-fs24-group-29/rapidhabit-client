import clsx from "clsx";

interface ChatBubbleProps {
  text: string;
  isSelf: boolean;
  initials?: string;
}

const ChatBubble = (props: ChatBubbleProps) => (
  <div
    className={clsx("flex flex-row gap-1 min-w-0", props.isSelf && "self-end")}
  >
    <div className="flex bg-light-green rounded-full w-4 h-4 text-xs mt-4 shrink-0">
      <span className="flex pl-[2px] text-dark-green font-semibold text-[8px]">
        {props.initials}
      </span>
    </div>
    <div className="bg-dark-green p-2 rounded-lg truncate whitespace-break-spaces break-all min-w-0">
      {props.text}
    </div>
  </div>
);

export default ChatBubble;
