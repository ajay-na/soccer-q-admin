import { Box } from "@mui/material";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { getAllMatches, supabase } from "../service/supabase";

export interface MatchEvent {
  event: "goal" | "yellow_card" | "red_card";
  minute: number;
  player: string;
}

export interface MatchDetailDto {
  id: number;
  description: string;
  location: string;
  status: string;
  created_at: string;
  match_start_time: string;
  half_time: string;
  end_time: string;

  team1_id: number;
  team1_goal: number;
  team1_events: MatchEvent[];

  team2_id: number;
  team2_goal: number;
  team2_events: MatchEvent[];
}
export default function Matches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      const data = await getAllMatches();
      setMatches(data);
      setLoading(false);
    }
    fetchMatches();
    const channel = supabase
      .channel("matches-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        (payload: RealtimePostgresChangesPayload<MatchDetailDto>) => {
          if ("id" in payload.new) {
            const updated = payload.new as MatchDetailDto;

            setMatches((prev) =>
              prev.map((match) =>
                match.id === updated.id
                  ? {
                      ...match,
                      team1_goal: updated.team1_goal,
                      team2_goal: updated.team2_goal,
                      status: updated.status,
                    }
                  : match
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  if (loading) {
    return <Box>Loading matches...</Box>;
  }
  return (
    <Box
      sx={{
        maxHeight: "calc(100dvh - 80px)",
        marginTop: "5px",
        marginBottom: "76px",
        overflowY: "auto",
        maxWidth: "95%",
        marginLeft: "5%",
        marginRight: "5%",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
      }}
    >
      {matches.map((match) => {
        return <MatchCard {...match} key={match.id} />;
      })}
    </Box>
  );
}
