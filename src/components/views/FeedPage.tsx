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
            <FeedBox group={"G1"} color={"bg-green-500"} p1={"Lena completed a 30-minute meditation session!"} p2={"Peace and calm, Lena! Who else is finding their inner peace today?"}></FeedBox>

            <h2 className="mt-4">Yesterday</h2>
            <FeedBox group={"G2"} color={"bg-blue-500"} p1={"John reached his daily step goal of 10,000 steps!"} p2={"Way to go, John! Keep those steps coming!"}></FeedBox>
            <FeedBox group={"G3"} color={"bg-purple-500"} p1={"Welcome to the group, Kim! Let's achieve our goals together!"} p2={"Keep up the great work, everyone! Together, we can accomplish amazing things!"}></FeedBox>
            <FeedBox group={"G1"} color={"bg-green-500"} p1={"Alex just completed his workout session!"} p2={"Great job, Alex! You’re inspiring us all to sweat a little more today."}></FeedBox>
            <FeedBox group={"G3"} color={"bg-purple-500"} p1={"Sarah finished reading a chapter of her book!"} p2={"Well done, Sarah! What’s the next chapter about?"}></FeedBox>

            <h2 className="mt-4">Recent days</h2>
            <FeedBox group={"G2"} color={"bg-blue-500"} p1={"Michael practiced playing guitar for 1 hour today!"} p2={"Rock on, Michael! Keep strumming those chords!"}></FeedBox>
            <FeedBox group={"G1"} color={"bg-green-500"} p1={"Welcome to the group, Emma! Let's work together to build healthy habits!"} p2={"Excited to have you join us, Emma! Let's crush our goals together!"}></FeedBox>
            <FeedBox group={"G3"} color={"bg-purple-500"} p1={"Emily finished her daily yoga session!"} p2={"Congratulations, Emily! Keep up the consistency and feel the benefits of yoga."}></FeedBox>
            <FeedBox group={"G2"} color={"bg-blue-500"} p1={"Joined the group: Michael"} p2={"Welcome aboard, Michael! Together, we'll strive for progress, not perfection."}></FeedBox>
            <FeedBox group={""} color={""} p1={""} p2={""}></FeedBox>



          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default FeedPage;
