import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { addMatch, getAllTeams } from "../service/supabase";
import { formatDateToInput } from "../util.service";

const MatchSchema = Yup.object().shape({
  team1: Yup.string().required("Team 1 is required"),
  team2: Yup.string()
    .required("Team 2 is required")
    .notOneOf([Yup.ref("team1")], "Team 2 cannot be the same as Team 1"),
  description: Yup.string().required("Description is required"),
  match_schedule: Yup.date().required("Match schedule is required"),
});

export default function MatchForm() {
  const [teams, setTeam] = useState<any[]>([]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const data = await addMatch(values);
      if (data) {
        toast.success("Match added successfully", {
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
      }
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Match adding failer", {
        style: {
          backgroundColor: "black",
          color: "red",
        },
      });
    }
  };
  useEffect(() => {
    async function fetchTeams() {
      const data = await getAllTeams();
      if (data.length) {
        setTeam(data);
      }
    }
    fetchTeams();
  }, []);
  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        mt: 5,
      }}
    >
      <Formik
        initialValues={{
          team1: "",
          team2: "",
          description: "ROUND 1",
          match_schedule: formatDateToInput(new Date()),
        }}
        validationSchema={MatchSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted:", values);
          handleSubmit(values, { resetForm });
          // resetForm();
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <TextField
              select
              fullWidth
              label="Team 1"
              name="team1"
              value={values.team1}
              onChange={handleChange}
              margin="normal"
              error={touched.team1 && Boolean(errors.team1)}
              helperText={touched.team1 && errors.team1}
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Team 2"
              name="team2"
              value={values.team2}
              onChange={handleChange}
              margin="normal"
              error={touched.team2 && Boolean(errors.team2)}
              helperText={touched.team2 && errors.team2}
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              margin="normal"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

            <TextField
              fullWidth
              type="datetime-local"
              label="Match Schedule"
              name="match_schedule"
              value={values.match_schedule}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={touched.match_schedule && Boolean(errors.match_schedule)}
              helperText={touched.match_schedule && errors.match_schedule}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Match
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer position="bottom-right" />
    </Box>
  );
}
