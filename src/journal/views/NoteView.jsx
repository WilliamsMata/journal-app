import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import {
  setActiveNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, formState, onInputChange } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("The note has been updated", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input
          ref={fileInputRef}
          onChange={onFileInputChange}
          type="file"
          multiple
          style={{ display: "none" }}
        />

        <IconButton
          onClick={() => fileInputRef.current.click()}
          color="primary"
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          onClick={onSaveNote}
          disabled={isSaving}
          color="primary"
          sx={{ p: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30 }} />
          <Typography>Save</Typography>
        </Button>
      </Grid>

      <Grid container>
        <TextField
          name="title"
          value={title}
          onChange={onInputChange}
          type="text"
          variant="filled"
          label="Title"
          placeholder="Your title"
          fullWidth
          sx={{ mb: 1 }}
        />

        <TextField
          name="body"
          value={body}
          onChange={onInputChange}
          type="text"
          variant="filled"
          placeholder="What happened today?"
          fullWidth
          multiline
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
