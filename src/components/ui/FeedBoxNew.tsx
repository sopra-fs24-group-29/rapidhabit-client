interface FeedProps {
  group: string;
  color: string;
  p1: string; // completion msg
  p2: string; // motivation msg
  date: string; // Datum des Feeds
}

const FeedBox = (props: FeedProps) => {
  return (
    <div
      className={`w-full h-24 ${props.color} bg-opacity-50 rounded-lg shadow-lg mt-2 p-2 flex flex-col justify-between`}
    >
      <div>
        <p className="text-sm font-bold">{props.date}</p> // Datum anzeigen
        <p className="text-sm">{props.p1}</p>
        <p className="text-sm">{props.p2}</p>
      </div>
      <div className="flex items-start">
        <h3>{props.group}</h3>
      </div>
    </div>
  );
};

export default FeedBox;
