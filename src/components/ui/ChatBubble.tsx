interface ChatBubbleProps {
  text: string;
  isSelf: boolean;
  initials?: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  return props.isSelf ? (
    <div className="bg-dark-green p-2 rounded-lg self-end">{props.text}</div>
  ) : (
    <div className="flex flex-row gap-1">
      <div className="flex bg-light-green rounded-full w-4 h-4 text-xs mt-4">
        <span className="flex pl-[2px] text-dark-green font-semibold text-[8px]">
          {props.initials}
        </span>
      </div>
      <div className="bg-dark-green p-2 rounded-lg truncate">{props.text}</div>
    </div>
  );
};

export default ChatBubble;
