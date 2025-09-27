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
}
export default function MatchEvents({ team1Events, team2Events }: Props) {
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
        <TeamStat events={team1Events} />
        <TeamStat events={team2Events} />
      </Box>
    </Box>
  );
}
