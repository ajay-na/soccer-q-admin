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
}

export default function TeamStat({ events }: Props) {
  return (
    <Box>
      {events.map((event, index) => {
        return (
          <Box key={index}>
            <Event
              event={event.event}
              player={event.player}
              minute={event.minute}
            />
          </Box>
        );
      })}
    </Box>
  );
}
