import React from "react";

interface FeedProps {
  group: string;
  color: string;
  p1: string;
  p2?: string;
  dateTime: string;
}

const FeedBox: React.FC<FeedProps> = (props) => {
  const formattedDateTime = new Date(props.dateTime).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div
      className={`w-full ${props.color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-4 flex flex-col justify-between my-5`}
    >
      <div className="mb-2">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold">{props.group}</h3>
          <div className="pt-[3px] pr-1 font-medium text-xs">
            {formattedDateTime}
          </div>
        </div>
        <p className="text-sm">{props.p1}</p>
        <p className="text-sm">{props.p2}</p>
      </div>
    </div>
  );
};

export default FeedBox;
