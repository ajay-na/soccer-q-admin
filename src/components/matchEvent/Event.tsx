import type { JSX } from "@emotion/react/jsx-runtime";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Box } from "@mui/material";
import { CardIcon } from "./Card";
interface Props {
  event: string;
  player: string;
  minute: number | string;
}

const eventMapping: Record<string, JSX.Element> = {
  goal: <SportsSoccerIcon />,
  yellow_card: <CardIcon color={"yellow"} />,
  red_card: <CardIcon color={"red"} />,
};

export default function Event({ event, player, minute }: Props) {
  return (
    <Box display="flex" alignItems={"center"}>
      <Box marginRight={1} marginTop={1} alignItems={"center"}>
        {eventMapping[event]}
      </Box>
      <Box>{player}</Box>
      <Box marginLeft={1}>{minute}"</Box>
    </Box>
  );
}
