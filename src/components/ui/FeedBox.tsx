interface FeedProps {
  group: string;
  color: string;
  p1: string;
}

const FeedBox = (props: FeedProps ) => {
  return (
    <div className={`w-full h-14 ${props.color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-2 flex justify-between`}>
      <div>
        <p className="text-sm">{props.p1}</p>
      </div>
      <div className="flex items-start">
        <h3>{props.group}</h3>
      </div>
    </div>
  );
};

export default FeedBox;