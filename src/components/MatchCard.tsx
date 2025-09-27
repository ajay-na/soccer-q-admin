import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Score from "./Score";

// Team DTO
export interface TeamDTO {
  id: number;
  logo: string;
  name: string;
  short_form: string;
}

// Match DTO
export interface MatchDTO {
  id: number;
  description: string;
  team1_goal: number;
  team2_goal: number;
  match_schedule: string; // ISO string (UTC timestamp)
  match_start_time: string; // ISO string (UTC timestamp)
  half_time: string;
  end_time: string;
  status: "not_started" | "live" | "finished" | "abandoned" | "postponed";
  location: string;
  team1: TeamDTO;
  team2: TeamDTO;
}

export default function MatchCard({
  id,
  description,
  team1_goal,
  team2_goal,
  match_schedule,
  match_start_time,
  half_time,
  end_time,
  status,
  team1,
  team2,
}: MatchDTO) {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/match/${id}`)}
      sx={{
        mb: 2,
        p: 2,
        height: "70px",
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: "30px",
        boxShadow: "-2px 10px 3px rgba(72, 122, 52, 0.25)",
      }}
    >
      <Box sx={{ display: "flex", width: "90%", alignItems: "center" }}>
        <Box
          sx={{
            width: "35%",
            textAlign: "right",
            marginRight: "10%",
          }}
        >
          <Typography variant="h5">
            <strong>{team1.short_form}</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "30%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Score
            team1_goal={team1_goal}
            team2_goal={team2_goal}
            description={description}
            match_start_time={match_start_time}
            half_time={half_time}
            end_time={end_time}
            status={status}
            match_schedule={match_schedule}
          />
        </Box>
        <Box sx={{ width: "35%", textAlign: "left", marginLeft: "10%" }}>
          <Typography variant="h5">
            <strong>{team2.short_form}</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
