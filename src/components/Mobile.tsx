import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CreateMatch from "../pages/CreateMatch";
import MatchDetail from "../pages/MatchDetail";
import Matches from "../pages/Matches";
import Navbar from "./Navbar";

export default function Mobile() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Matches />} />
        <Route path="/create" element={<CreateMatch />} />
        <Route path="/match/:id" element={<MatchDetail />} />
      </Routes>
      <Navbar />
    </Box>
  );
}
