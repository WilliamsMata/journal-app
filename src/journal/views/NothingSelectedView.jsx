import StarOutline from "@mui/icons-material/StarOutline";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 150px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color="white" variant="h5">
          Select o create an entry
        </Typography>
      </Grid>
    </Grid>
  );
};
