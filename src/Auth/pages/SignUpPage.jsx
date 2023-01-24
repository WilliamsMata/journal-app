import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import Google from "@mui/icons-material/Google";

import AuthLayout from "../layout/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              placeholder="Your name"
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@mail.com"
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Create account
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 1 }}>You have an account?</Typography>
            <Link
              component={RouterLink}
              color="secondary.main"
              to="/auth/login"
            >
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
