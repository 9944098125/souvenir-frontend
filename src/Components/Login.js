import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import {
  Stack,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../Redux/Actions/loginAction";
import AlertModal from "./Modal";
import DocumentTitle from "./DocumentTitle";

//form validations
const validationSchema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .required("Password is required")
    // .matches(/^(?!\s$)/,'Password field cannot be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      " Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" // eslint-disable-line
    ),
});

const Login = () => {
  DocumentTitle("Souvenir -> Sign In");
  const [showPassword, setShowPassword] = useState(false);

  // Redux State:
  const LoginDetails = useSelector((state) => state.auth);
  // console.log('loading', LoginDetails.loading)
  const alert = useSelector((state) => state.alert);

  // Used to change the routes:
  const Navigator = useNavigate();

  //Redux Dispatch
  const dispatch = useDispatch();

  //managing form state
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        username: values.username,
        password: values.password,
      };
      dispatch(login(body));
      // console.log(values);
    },
  });

  useEffect(() => {
    if (LoginDetails.isAuthenticated) {
      return Navigator("/get");
    }
  }, [LoginDetails.isAuthenticated, Navigator]);

  //toggle showPassword
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Fragment>
      <div className="login-bg">
        <Grid
          container
          className="login-bg"
          alignItems={"flex-start"}
          justifyContent={"center"}
          display={"flex"}
          direction={"column"}
        >
          <Paper
            elevation={10}
            sx={{
              width: { xs: "90%", sm: "80%", md: "70%", xl: "60%" },
              ml: { xs: 2, sm: 5, md: 7, lg: 10 },
            }}
            height={"500px"}
            style={{ borderRadius: "10px" }}
          >
            {alert.message && <AlertModal show={true} />}
            <Stack
              p={2}
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Grid
                item
                md={6}
                xs={12}
                sx={{ height: { xs: 460, sm: 425 } }}
                alignItems={"center"}
              >
                <Stack mt={3} direction={"column"} alignItems={"center"}>
                  <Typography
                    fontWeight="fontWeightBold"
                    variant="h4"
                    component="h2"
                  >
                    Sign In
                  </Typography>
                  <Typography variant="subtitle2" component="div">
                    Do not have an account?
                    <Link to="/register">Sign Up</Link>
                  </Typography>
                </Stack>
                <form onSubmit={formik.handleSubmit}>
                  <Stack
                    component="div"
                    id="loginForm"
                    sx={{ width: "85%", marginX: "auto" }}
                    spacing={3}
                    direction={"column"}
                  >
                    <TextField
                      name="username"
                      type="text"
                      sx={{ mt: 3, p: 1 }}
                      id="login-email"
                      placeholder="Enter email address"
                      label="User Name"
                      variant="standard"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.email &&
                        Boolean(formik.errors.username) &&
                        formik.errors.username
                      }
                    />
                    <Typography sx={{ fontWeight: "800", fontStyle: "italic" }}>
                      User name is Case sensitive
                    </Typography>
                    <TextField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      sx={{ mb: 4, p: 1 }}
                      id="login-password"
                      placeholder="Enter password"
                      label="Password"
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePassword}
                              color="primary"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password &&
                        Boolean(formik.errors.password) &&
                        formik.errors.password
                      }
                    />
                    <Stack style={{ marginTop: "60px" }} direction="column">
                      <Button type="submit" variant="contained" color="primary">
                        {LoginDetails.loading ? (
                          <CircularProgress />
                        ) : (
                          <div>Sign In</div>
                        )}
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Grid>
              <Box>
                <img
                  src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8&w=1000&q=80"
                  alt="login"
                  className="loginBanner"
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Login;
