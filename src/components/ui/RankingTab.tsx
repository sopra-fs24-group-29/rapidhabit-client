import { api } from "helpers/api";
import { Group } from "models/Group";
import { Ranking } from "models/Ranking";
import { useEffect, useMemo, useState } from "react";
import RankingAvatar from "./RankingAvatar";

interface RankingTabProps {
  group: Group;
}

const RankingTab = (props: RankingTabProps) => {
  const groupId = props.group.id;

  const [ranking, setRanking] = useState<Ranking>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/ranking`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setRanking(response.data);
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

  const rankingMessage = useMemo(() => {}, []);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!ranking) return null;

  return (
    <div className="flex justify-center gap-7 pt-14">
      {sortedRankedMembers?.map((rankingMember) => (
        <RankingAvatar key={rankingMember.id} rankingMember={rankingMember} />
      ))}
    </div>
  );
};

export default RankingTab;
