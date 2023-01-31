import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";

import JournalLayout from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store/journal";

const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {!active ? <NothingSelectedView /> : <NoteView />}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          bgcolor: "error.main",
          position: "fixed",
          right: "min(4vw, 2rem)",
          bottom: "min(4vw, 2rem)",
          ":hover": { bgcolor: "error.main", opacity: 0.9 },
          ":disabled": { bgcolor: "error.main", opacity: 0.7 },
        }}
      >
        <AddOutlined fontSize="2rem" />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
