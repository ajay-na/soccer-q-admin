import { Box } from "@mui/material";
import MatchDetailCard, { type MatchDetailProps } from "./MatchDetailCard";

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

  team1: any;
  team1_goal: number;
  team1_events: MatchEvent[];

  team2: any;
  team2_goal: number;
  team2_events: MatchEvent[];
}

export default function MatchDetailComponent(match: MatchDetailProps) {
  // const [match, setMatch] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  // const { id } = useParams();

  // useEffect(() => {
  //   async function getMatchById(id: number) {
  //     const data = await getMatchDetailById(id);
  //     setLoading(false);
  //     setMatch(data);
  //   }
  //   if (id) {
  //     getMatchById(parseInt(id));
  //   }
  //   // const channel = supabase
  //   //   .channel("matches-updates")
  //   //   .on(
  //   //     "postgres_changes",
  //   //     { event: "*", schema: "public", table: "matches" },
  //   //     (payload: RealtimePostgresChangesPayload<MatchDetailDto>) => {
  //   //       if ("id" in payload.new) {
  //   //         const updated = payload.new as MatchDetailDto;
  //   //         setMatch((prev: any) =>
  //   //           prev
  //   //             ? {
  //   //                 ...prev,
  //   //                 team1_goal: updated.team1_goal,
  //   //                 team2_goal: updated.team2_goal,
  //   //                 status: updated.status,
  //   //                 team1_events: updated.team1_events,
  //   //                 team2_events: updated.team2_events,
  //   //               }
  //   //             : prev
  //   //         );
  //   //       }
  //   //     }
  //   //   )
  //   //   .subscribe();

  //   // return () => {
  //   //   supabase.removeChannel(channel);
  //   // };
  // }, []);
  // if (loading) {
  //   return <Box>loading match details...</Box>;
  // }

  return (
    <Box
      sx={{
        minHeight: "calc(100dvh - 150px)",
      }}
    >
      <MatchDetailCard {...match} />
    </Box>
  );
}
