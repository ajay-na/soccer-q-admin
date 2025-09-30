import { Box } from "@mui/material";
import Event from "./Event";
// "event": "goal", "minute": 45, "player": "Sam Roy"

interface EventDto {
  event: string;
  minute: number;
  player: string;
}

interface Props {
  events: EventDto[];
  match_start_time?: string;
  half_time?: string;
}

export default function TeamStat({
  events,
  match_start_time,
  half_time,
}: Props) {
  return (
    <Box>
      {events.map((event, index) => {
        return (
          <Box key={index}>
            <Event
              event={event.event}
              player={event.player}
              minute={event.minute}
              match_start_time={match_start_time}
              half_time={half_time}
            />
          </Box>
        );
      })}
    </Box>
  );
}
