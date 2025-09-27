import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Form, Formik } from "formik"; // ✅ use Formik's Form, not react-router-dom's
import { useState } from "react";
import * as Yup from "yup";
import type { Team } from "../dtos/common.dto";
import { getPlayeListByTeam } from "../service/supabase";
import { formatDateToInput } from "../util.service";

const GoalSchema = Yup.object().shape({
  team: Yup.string().required("Team is required"),
  player: Yup.string().required("Player name is required"),
  event_time: Yup.date().required("Time is required"),
});

interface Prop {
  teams: Team[];
}
export default function GoalForm({ teams }: Prop) {
  const [players, setPlayers] = useState<any>([]);
  const fetchPlayers = async (teamId: number | string) => {
    try {
      if (!teamId) {
        setPlayers([]);
        return;
      }
      const data = await getPlayeListByTeam(teamId);

      setPlayers(data || []);
    } catch (error: any) {
      console.error("Error fetching players:", error.message);
      setPlayers([]);
    }
  };
  return (
    <Box>
      <Formik
        initialValues={{
          team: "",
          player: "",
          event_time: formatDateToInput(new Date()),
        }}
        validationSchema={GoalSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted:", values);
          resetForm();
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <TextField
              select
              fullWidth
              label="Team"
              name="team"
              value={values.team}
              onChange={async (e) => {
                handleChange(e);
                await fetchPlayers(e.target.value);
              }}
              margin="normal"
              error={touched.team && Boolean(errors.team)}
              helperText={touched.team && errors.team}
            >
              {teams.map((team) => (
                <MenuItem value={team.id}>{team.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Player"
              name="player"
              value={values.player}
              onChange={handleChange}
              margin="normal"
              error={touched.player && Boolean(errors.player)}
              helperText={touched.player && errors.player}
            >
              {players.map((player: any) => (
                <MenuItem value={player.name}>{player.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              type="datetime-local"
              label="Event Time"
              name="event_time"
              value={values.event_time}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={touched.event_time && Boolean(errors.event_time)}
              helperText={touched.event_time && errors.event_time}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Goal
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
