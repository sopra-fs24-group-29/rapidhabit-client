interface FeedProps {
  group: string;
  color: string;
  p1: string;
  p2: string;
}

const FeedBox = (props: FeedProps) => {
  return (
    <div
      className={`w-full ${props.color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-4 flex flex-col justify-between`}
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold">{props.group}</h3>
        <p className="text-sm">{props.p1}</p>
        <p className="text-sm">{props.p2}</p>
      </div>
    </div>
  );
};

export default FeedBox;
