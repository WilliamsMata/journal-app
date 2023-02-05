import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Google from "@mui/icons-material/Google";

import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

const formData = {
  email: "",
  password: "",
};

const formValidation = {
  email: [(value) => value.includes("@"), "Email is invalid."],
  password: [
    (value) => value.length >= 6,
    "Password must contain more than 6 characters.",
  ],
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const {
    email,
    password,
    formState,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidation);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
        aria-label="form"
      >
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="email"
              onChange={onInputChange}
              value={email}
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
              onChange={onInputChange}
              value={password}
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              sx={{ mt: 2 }}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
              inputProps={{
                "data-testid": "password",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isAuthenticating}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              onClick={onGoogleSignIn}
              variant="contained"
              fullWidth
              disabled={isAuthenticating}
              aria-label="google-btn"
            >
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
