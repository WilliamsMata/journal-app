import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";

import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidation = {
  email: [(value) => value.includes("@"), "Email is invalid."],
  password: [
    (value) => value.length >= 6,
    "Password must contain more than 6 characters.",
  ],
  displayName: [(value) => value.length >= 1, "Your name is required."],
};

const SignUpPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidation);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(formState);
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              label="Name"
              type="text"
              placeholder="Your name"
              fullWidth
              sx={{ mt: 2 }}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted && displayNameValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              value={email}
              onChange={onInputChange}
              label="Email"
              type="email"
              placeholder="example@mail.com"
              fullWidth
              sx={{ mt: 2 }}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password"
              value={password}
              onChange={onInputChange}
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              sx={{ mt: 2 }}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
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
