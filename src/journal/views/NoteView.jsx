import SaveOutlined from "@mui/icons-material/SaveOutlined";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          24 de enero 2023
        </Typography>
      </Grid>

      <Grid item>
        <Button color="primary" sx={{ p: 2 }}>
          <SaveOutlined sx={{ fontSize: 30 }} />
          <Typography>Save</Typography>
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          label="Title"
          placeholder="Your title"
          fullWidth
          sx={{ mb: 1 }}
        />

        <TextField
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
