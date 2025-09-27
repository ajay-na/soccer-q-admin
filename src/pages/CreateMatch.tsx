import { Box, Typography } from "@mui/material";
import MatchForm from "../components/Form";

export default function CreateMatch() {
  return (
    <Box>
      <Box>
        <Typography variant="h3">Create Match</Typography>
        <MatchForm />
      </Box>
    </Box>
  );
}
