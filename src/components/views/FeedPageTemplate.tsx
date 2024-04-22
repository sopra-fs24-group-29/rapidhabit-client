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
            <FeedBox
              group={"G1"}
              color={"bg-green-500"}
              p1={"Lena completed a 30-minute meditation session!"}
            ></FeedBox>

            <h2 className="mt-4">Yesterday</h2>
            <FeedBox
              group={"G2"}
              color={"bg-blue-500"}
              p1={"John reached his daily step goal of 10,000 steps!"}
            ></FeedBox>
            <FeedBox
              group={"G3"}
              color={"bg-purple-500"}
              p1={
                "Welcome to the group, Kim! Let's achieve our goals together!"
              }
            ></FeedBox>
            <FeedBox
              group={"G1"}
              color={"bg-green-500"}
              p1={"Alex just completed his workout session!"}
            ></FeedBox>
            <FeedBox
              group={"G3"}
              color={"bg-purple-500"}
              p1={"Sarah finished reading a chapter of her book!"}
            ></FeedBox>

            <h2 className="mt-4">Recent days</h2>
            <FeedBox
              group={"G2"}
              color={"bg-blue-500"}
              p1={"Michael practiced playing guitar for 1 hour today!"}
            ></FeedBox>
            <FeedBox
              group={"G1"}
              color={"bg-green-500"}
              p1={
                "Welcome to the group, Emma! Let's work together to build healthy habits!"
              }
            ></FeedBox>
            <FeedBox
              group={"G3"}
              color={"bg-purple-500"}
              p1={"Emily finished her daily yoga session!"}
            ></FeedBox>
            <FeedBox
              group={"G2"}
              color={"bg-blue-500"}
              p1={"Joined the group: Michael"}
            ></FeedBox>
            <FeedBox group={""} color={""} p1={""} ></FeedBox>
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default FeedPage;
