import { Box, Button, Modal, Typography } from "@mui/material";
import type { Team } from "../dtos/common.dto";
import GoalForm from "./GoalCardForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  teams: Team[];
}


export default function BasicModal({
  open,
  handleClose,
  handleOpen,
  teams,
}: Props) {
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add goal details
          </Typography>
          <GoalForm teams={teams} />
        </Box>
      </Modal>
    </div>
  );
}
