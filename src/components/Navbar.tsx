import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        // left: "10%",
        bottom: "0px",
        width: "100%",
        // borderRadius: "34px",
      }}
    >
      <BottomNavigation
        sx={{
          backgroundColor: "#1e1e1e",
          width: "100%",
          // borderRadius: "34px",
        }}
        showLabels
        value={value}
        onChange={(_event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          label="Matches"
          onClick={() => navigate("/")}
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#4caf50",
            },
          }}
        />
        <BottomNavigationAction
          label="Create"
          onClick={() => navigate("/create")}
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#4caf50",
            },
          }}
        />
        {/* <BottomNavigationAction
          label="Stats"
          onClick={() => navigate("/stats")}
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#4caf50",
            },
          }}
        /> */}
      </BottomNavigation>
    </Box>
  );
}
