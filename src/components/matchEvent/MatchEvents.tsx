import { Box, Typography } from "@mui/material";
import TeamStat from "./TeamStat";

interface EventDto {
  event: string;
  minute: number;
  player: string;
}
interface Props {
  team1Events: EventDto[];
  team2Events: EventDto[];
  match_start_time?: string;
  half_time?: string;
}
export default function MatchEvents({
  team1Events,
  team2Events,
  match_start_time,
  half_time,
}: Props) {
  return (
    <Box
      sx={{
        marginTop: "20px",
        backgroundColor: "#74c69d",
        borderRadius: "10px",
        padding: "12px",
      }}
    >
      <Typography variant="h6" textAlign={"center"}>
        <strong>Match events</strong>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TeamStat
          events={team1Events}
          match_start_time={match_start_time}
          half_time={half_time}
        />
        <TeamStat
          events={team2Events}
          match_start_time={match_start_time}
          half_time={half_time}
        />
      </Box>
    </Box>
  );
}
