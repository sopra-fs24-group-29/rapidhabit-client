import BaseContainer from "components/ui/BaseContainer";
import TabBar from "../ui/Tabbar.tsx";
import FeedBox from "../ui/FeedBox.tsx";


const FeedPage = () => {
  return (
    <div className="overflow-y-auto">
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div className="w-custom-236 lg:w-custom-354">

            <h1 className="text-left text-2xl lg:text-4xl">Feed</h1>

            <h2 className="mt-4">Today</h2>
            <FeedBox group={"G3"} color={"bg-green-500"} p1={"USER completed the HABIT!"} />

            <h2 className="mt-4">Yesterday</h2>
            <FeedBox group={"G1"} color={"bg-blue-500"} p1={"USER completed the HABIT!"} />
            <FeedBox group={"G2"} color={"bg-purple-500"} p1={"USER completed the HABIT!"} />

            <h2 className="mt-4">Recent days</h2>
            <FeedBox group={"G1"} color={"bg-blue-500"} p1={"USER joined the group!"} />
            <FeedBox group={"G3"} color={"bg-green-500"} p1={"USER joined the group!"} />
            <FeedBox group={"G2"} color={"bg-purple-500"} p1={"USER joined the group!"} />

          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default FeedPage;
