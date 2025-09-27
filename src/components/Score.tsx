import { Box, Typography } from "@mui/material";
import { getDateInTextFormat, getMatchStatus } from "../util.service";
interface Props {
  team1_goal: number;
  team2_goal: number;
  description: string;
  match_start_time: string;
  match_schedule: string;
  half_time: string | undefined;
  end_time: string | undefined;
  status: string;
}

export default function Score({
  team1_goal,
  team2_goal,
  match_start_time,
  half_time,
  end_time,
  status,
  match_schedule,
}: Props) {
  // const currentDate = formatDate(new Date());
  // const isCurrentDay = isSameDay(currentDate, match_start_time);

  const matchStatus = getMatchStatus(
    match_start_time,
    half_time,
    end_time,
    status
  );
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box>{matchStatus}</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">
          <strong>{team1_goal}</strong>
        </Typography>
        <Typography variant="h6">-</Typography>
        <Typography variant="h5">
          {" "}
          <strong>{team2_goal}</strong>
        </Typography>
      </Box>
      <Box>{getDateInTextFormat(match_schedule)}</Box>
    </Box>
  );
}
