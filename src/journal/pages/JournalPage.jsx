import { IconButton } from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";

import JournalLayout from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}

      <NoteView />

      <IconButton
        size="large"
        sx={{
          color: "white",
          bgcolor: "error.main",
          position: "fixed",
          right: "min(4vw, 2rem)",
          bottom: "min(4vw, 2rem)",
          ":hover": { bgcolor: "error.main", opacity: 0.9 },
        }}
      >
        <AddOutlined fontSize="2rem" />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
