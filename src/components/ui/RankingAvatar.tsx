import clsx from "clsx";
import { RankingMember } from "models/Ranking";

interface RankingAvatarProps {
  rankingMember: RankingMember;
}

const RankingAvatar = (props: RankingAvatarProps) => {
  const rank = props.rankingMember.rank;
  return (
    <>
      <div className="rounded-full bg-light-green w-16 h-16 ">
        <span className="flex justify-center pt-4 text-dark-green font-semibold text-2xl">
          {props.rankingMember.initials}
        </span>
      </div>
      <div
        className={clsx(
          "rounded-full w-7 h-7 mt-10 border-2 border-black -ml-11",
          rank === 1 && "bg-[#F6D379]",
          rank === 2 && "bg-[#C0D6D9]",
          rank === 3 && "bg-[#E28F54]"
        )}
      >
        <span className="text-black font-bold pl-2">{rank}</span>
      </div>
    </>
  );
};

export default RankingAvatar;
