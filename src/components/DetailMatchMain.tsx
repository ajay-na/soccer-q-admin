import { Box } from "@mui/material";
import type { MatchDetailProps } from "./MatchDetailCard";
import NameHeader from "./NameHeader";
import Score from "./Score";

export default function DetailMatchMain(match: MatchDetailProps) {
  console.log(match.match_start_time, match.half_time, match.end_time);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "40% 20% 40%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <NameHeader name={match.team1.name} />
      <Score
        team1_goal={match.team1_goal}
        team2_goal={match.team2_goal}
        description={match.description}
        match_start_time={match.match_start_time}
        half_time={match.half_time}
        end_time={match.end_time}
        status={match.status}
        match_schedule={match.match_schedule}
      />
      <NameHeader name={match.team2.name} />
    </Box>
  );
}
