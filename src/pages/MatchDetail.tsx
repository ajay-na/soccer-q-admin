import type { JSX } from "@emotion/react/jsx-runtime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlagIcon from "@mui/icons-material/Flag";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TimerIcon from "@mui/icons-material/Timer";
import { Box, Button } from "@mui/material";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import MatchDetailComponent from "../components/MatchDetailComp";
import { getMatchDetailById, startMatch, supabase } from "../service/supabase";
import type { MatchDetailDto } from "./Matches";

export default function MatchDetail() {
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  type MatchAction = {
    key: string;
    text: string;
    icon: JSX.Element;
    func: (id: any) => any;
  };

  const matchActions: MatchAction[] = [
    {
      key: "startMatch",
      text: "Start",
      icon: <FlagIcon />,
      func: async (id) => {
        try {
          const data = await startMatch({
            is_live: true,
            match_start_time: new Date(),
            status: "live",
            id: id,
          });
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      key: "halfTime",
      text: "Half",
      icon: <TimerIcon />,
      func: async (id) => {
        try {
          const data = await startMatch({
            half_time: new Date(),
            status: "ht",
            id: id,
          });
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      key: "startHalfMatch",
      text: "Start 2nd half",
      icon: <FlagIcon />,
      func: async (id) => {
        try {
          const data = await startMatch({
            is_live: true,
            status: "live",
            id: id,
          });
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      key: "fullTime",
      text: "Fulltime",
      icon: <EmojiEventsIcon />,
      func: async (id) => {
        try {
          const data = await startMatch({
            is_live: true,
            end_time: new Date(),
            status: "finished",
            id: id,
          });
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      key: "events",
      text: "Events",
      icon: <SportsSoccerIcon />,
      func: () => {},
    },
  ];
  useEffect(() => {
    async function getMatchById(id: number) {
      const data = await getMatchDetailById(id);
      setLoading(false);
      setMatch(data);
    }
    if (id) {
      getMatchById(parseInt(id));
    }
    const channel = supabase
      .channel("matches-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        (payload: RealtimePostgresChangesPayload<MatchDetailDto>) => {
          if ("id" in payload.new) {
            const updated = payload.new as MatchDetailDto;
            setMatch((prev: any) =>
              prev
                ? {
                    ...prev,
                    team1_goal: updated.team1_goal,
                    team2_goal: updated.team2_goal,
                    status: updated.status,
                    team1_events: updated.team1_events,
                    team2_events: updated.team2_events,
                    match_start_time: updated.match_start_time,
                    half_time: updated.half_time,
                    end_time: updated.end_time,
                  }
                : prev
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);
  if (loading) {
    return <Box>loading.........</Box>;
  }
  const teams = [match.team1, match.team2];
  return (
    <Box>
      <Box sx={{ height: "400px", minWidth: "100%" }}>
        <MatchDetailComponent {...match} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        {matchActions.map((action) => (
          <Button
            key={action.key}
            sx={{ width: "80%", mb: 2, height: 100 }}
            variant="contained"
            startIcon={action.icon}
            onClick={() => action.func(id)}
          >
            {action.text}
          </Button>
        ))}
      </Box>
      <BasicModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        teams={teams}
        matchId={match.id}
      />
    </Box>
  );
}
