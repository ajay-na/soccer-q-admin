import { Box } from "@mui/material";

type CardProps = {
  color: "yellow" | "red";
  size?: number;
};

export function CardIcon({ color, size = 20 }: CardProps) {
  return (
    <Box
      sx={{
        width: size * 0.7,
        height: size,
        bgcolor: color,
        borderRadius: "3px",
        marginTop: "-3px",
        marginRight: "6px",
        marginLeft: "3px",
        display: "inline-block",
        border: "1px solid black",
      }}
    />
  );
}
