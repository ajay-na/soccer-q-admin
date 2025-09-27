import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Mobile from "./components/Mobile";

function App() {
  const [isMobile, setIsmobile] = useState<boolean>(false);
  useEffect(() => {
    const handleSize = () => {
      setIsmobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleSize);
    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, [window.innerWidth]);
  return (
    <Box>
      {isMobile ? <Mobile /> : <Box>only mobile devices supported</Box>}
    </Box>
  );
}

export default App;
