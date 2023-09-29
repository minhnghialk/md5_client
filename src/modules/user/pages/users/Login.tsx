/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";
import { User, userAction } from "@/store/slices/user.slice";
import apis from "@/services/apis";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });
  const navigate = useNavigate();
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      userNameOrEmail: (e.target as any).userNameOrEmail.value,
      password: (e.target as any).password.value,
    };
    // console.log("data", data);
    // axios
    //   .post("http://127.0.0.1:3000/api/v1/users/login", data)
    //   .then((res: any) => {
    //     console.log("res", res);
    //     console.log("token", res.data.token);
    //     if (res.status === 200) {
    //       localStorage.setItem("token", res.data.token);
    //       window.location.href = "http://localhost:5173/home";
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log("err", err);
    //   });

    apis.userApi
      .login(data)
      .then((res: any) => {
        console.log("res", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          dispatch(userAction.reload());
        }
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }

  // function handleResendEmail() {
  //   axios.get("http://127.0.0.1:3000/api/v1/users/resend-email", {
  //     headers: {
  //       token: localStorage.getItem("token"),
  //     },
  //   });
  // }

  React.useEffect(() => {
    if (userStore.data) {
      navigate("home");
    }
  }, [userStore.data]);

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(236, 50, 50)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              PLEASE LOGIN INTO YOUR ACCOUNT
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                handleLogin(e);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userNameOrEmail"
                label="User Name or Email Address"
                name="userNameOrEmail"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="http://localhost:5173/reset-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      {/* {userStore === null ? (
        <>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "rgb(236, 50, 50)" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h6">
                  PLEASE LOGIN INTO YOUR ACCOUNT
                </Typography>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    handleLogin(e);
                  }}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userNameOrEmail"
                    label="User Name or Email Address"
                    name="userNameOrEmail"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="http://localhost:5173/reset-password"
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Register"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </>
      ) : (
        <>
          Your email: {(userStore! as User).email}
          <br />
          Email authentication status:{" "}
          {(userStore! as User).emailAuthentication
            ? "Authenticated"
            : "Email has not been authenticated"}
          <br />
          <button
            onClick={() => {
              handleResendEmail();
            }}
          >
            Resend Email
          </button>
        </>
      )} */}
    </div>
  );
}
