import { Card, CardContent, Typography } from "@mui/material";
import DetailMatchMain from "./DetailMatchMain";
import MatchEvents from "./matchEvent/MatchEvents";
// import DetailMatchMain from "./DetailMatchMain";
// import MatchEvents from "./matchEvent/MatchEvents";

interface MatchStat {
  event: string;
  minute: number;
  player: string;
}

interface Team {
  id: number;
  logo: string;
  name: string;
  short_form: string;
}

export interface MatchDetailProps {
  id: number;
  team1: Team;
  team2: Team;
  team1_goal: number;
  team2_goal: number;
  match_schedule: string;
  match_start_time: string;
  match_status: string;
  team1_events: MatchStat[];
  team2_events: MatchStat[];
  location: string;
  description: string;
  half_time?: string;
  end_time?: string;
  status: string;
}

export default function MatchDetailCard(match: MatchDetailProps) {
  return (
    <Card
      sx={{
        maxWidth: "90%",
        margin: "80px auto 0",
        backgroundColor: "#b7e4c7",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign={"center"}
        >
          {match.description}
        </Typography>
        <DetailMatchMain {...match} />
        <MatchEvents
          team1Events={match.team1_events}
          team2Events={match.team2_events}
        />
      </CardContent>
    </Card>
  );
}
