import { api } from "helpers/api";
import { Group } from "models/Group";
import { Ranking } from "models/Ranking";
import { Score } from "models/Score";
import { useEffect, useMemo, useState } from "react";
import RankingAvatar from "./RankingAvatar";

interface RankingTabProps {
  group: Group;
}

const RankingTab = (props: RankingTabProps) => {
  const groupId = props.group.id;
  const userId = localStorage.getItem("userId");

  const [ranking, setRanking] = useState<Ranking>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [scores, setScores] = useState<Score[]>();

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const [rankingResponse, scoreResponse] = await Promise.all([
          api.get(`/groups/${groupId}/ranking`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          api.get(`/groups/${groupId}/scores`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
        ]);

        setRanking(rankingResponse.data);
        setScores(scoreResponse.data.scores);
      } catch (error) {
        setErrorMessage("The ranking of this group is currently unavailable.");
        console.error("Error while loading ranking of group", error);
      }
    };
    loadRanking();
  }, [groupId]);

  const sortedRankedMembers = useMemo(() => {
    return ranking?.sort((a, b) => a.rank - b.rank);
  }, [ranking]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!ranking) return null;

  return (
    <>
      <div className="flex justify-center gap-7 pt-14">
        {sortedRankedMembers?.map((rankingMember) => (
          <RankingAvatar key={rankingMember.id} rankingMember={rankingMember} />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center font-semibold text-center pt-14">
        <span>Your current points:</span>
        <span>{scores?.find((score) => score.userId === userId)?.points}</span>
      </div>
    </>
  );
};

export default RankingTab;
