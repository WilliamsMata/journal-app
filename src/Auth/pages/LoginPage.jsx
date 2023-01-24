import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import Google from "@mui/icons-material/Google";

import AuthLayout from "../layout/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@mail.com"
              fullWidth
              sx={{ mt: 2 }}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              sx={{ mt: 2 }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 1 }}>New User?</Typography>
            <Link
              component={RouterLink}
              color="secondary.main"
              to="/auth/signup"
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
