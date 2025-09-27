import { Box, Typography, type SxProps } from "@mui/material";
interface Props {
  name: string;
  sx?: SxProps<any>;
}

export default function NameHeader({ name, sx }: Props) {
  return (
    <Box sx={sx} display={"flex"} textAlign={"center"}>
      <Typography variant="h6">
        <strong>{name}</strong>
      </Typography>
    </Box>
  );
}
