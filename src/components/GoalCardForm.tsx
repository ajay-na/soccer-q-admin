import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import type { Team } from "../dtos/common.dto";
import { addMatchEvent, getPlayeListByTeam } from "../service/supabase";
import { formatDateToInput } from "../util.service";

const Event_Type: string[] = ["goal", "yellow_card", "red_card  "];
const GoalSchema = Yup.object().shape({
  event: Yup.string()
    .oneOf(Event_Type, "Invalid event type")
    .required("Event is required"),
  team: Yup.object({
    id: Yup.string().required("Team is required"), // only validate id
    name: Yup.string(),
  }),
  player: Yup.string().required("Player name is required"),
  event_time: Yup.string().required("Time is required"),
});

interface Prop {
  teams: Team[];
  id: number;
}

export default function GoalForm({ teams, id }: Prop) {
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
  const handleSubmit = async (values: any) => {
    try {
      const data = await addMatchEvent({ ...values, id });
      console.log(data);
    } catch (error) {
      throw error;
    }
  };
  return (
    <Box>
      <Formik
        initialValues={{
          event: Event_Type[0],
          team: { id: "", name: "" },
          player: "",
          event_time: formatDateToInput(new Date()),
        }}
        validationSchema={GoalSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form>
            <TextField
              select
              fullWidth
              label="Event"
              name="event"
              value={values.event}
              onChange={handleChange}
              margin="normal"
              error={touched.event && Boolean(errors.event)}
              helperText={touched.event && errors.event}
            >
              {Event_Type.map((event) => (
                <MenuItem value={event}>{event}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Team"
              name="team.id"
              value={values.team?.id ?? ""}
              onChange={async (e) => {
                handleChange(e);
                const selectedTeam = teams.find(
                  (team) => team.id === Number(e.target.value)
                );
                await fetchPlayers(e.target.value);
                setFieldValue("team", {
                  id: selectedTeam?.id,
                  name: selectedTeam?.name,
                });
              }}
              margin="normal"
              error={touched.team && Boolean(errors.team)}
              helperText={touched.team?.name && errors.team?.id}
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

            {/* <TextField
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
            /> */}

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
