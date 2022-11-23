import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import InterestsIcon from "@mui/icons-material/Interests";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signupAction } from "../Redux/Actions/signupAction";
import AlertModal from "./Modal";
import { useNavigate, Link } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  phone: yup.string().required("Phone Number is required"),
  password: yup
    .string()
    .required("Password is required")
    // .matches(/^(?!\s$)/,'Password field cannot be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      " Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character" // eslint-disable-line
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password must match"
    ),
});

function Registration() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const body = {
        username: values.username,
        password: values.password,
        phoneNumber: values.phone,
      };
      dispatch(signupAction(body));
      resetForm();
    },
  });
  // console.log("Formik", formik);

  const signupReducer = useSelector((state) => state.signup);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.type === "clear") {
      Navigate("/");
    }
  }, [Navigate, alert]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Fragment>
      <div className="registration-bg">
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "80%",
            p: 1,
            borderRadius: "8px",
            mt: 4,
            mb: 6,
          }}
        >
          <InterestsIcon sx={{ color: "red", mr: 2 }} />
          <Typography
            variant="h4"
            sx={{
              color: "black",
              fontWeight: "900",
            }}
          >
            SOUVENIR
          </Typography>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", md: "center" },
            pr: 5,
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: 5,
              alignSelf: "center",
              pl: 8,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "32px", lg: "40px" },
                color: "black",
                fontWeight: "bold",
              }}
            >
              WRITE, OR PASTE ANSWERS AND YOU CAN SAVE THEM AND USE THEM,
              ALREADY HAVE AN ACCOUNT ? THEN<Link to="/">Sign In</Link>
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              p: 3,
              m: 4,
              mt: -2,
              borderRadius: "12px",
              width: { xs: "60vw", md: "45vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {alert.message && <AlertModal show={true} />}
            <form onSubmit={formik.handleSubmit}>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  label="User Name"
                  variant="standard"
                  sx={{ mr: 3, width: "80%", mb: 5, p: 1 }}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                />
              </Grid>
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  type="string"
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  label="Phone Number"
                  variant="standard"
                  sx={{ mr: 3, width: "80%", mb: 5, p: 1 }}
                />
              </Grid>
              <Grid
                sx={{
                  display: { sm: "block", md: "flex" },
                  alignItems: "center",
                }}
              >
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  sx={{ mr: 3, width: "80%", mb: 5, p: 1 }}
                  label="Password"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword} color="primary">
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
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  // helperText={
                  //   formik.touched.password &&
                  //   Boolean(formik.errors.password) &&
                  //   formik.errors.password
                  // }
                />
                <TextField
                  name="confirmPassword"
                  type={showPassword2 ? "text" : "password"}
                  sx={{ mr: 3, width: "80%", mb: 5, p: 1 }}
                  label="Confirm Password"
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword2} color="primary">
                          {showPassword2 ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  // helperText={
                  //   formik.touched.confirmPassword &&
                  //   Boolean(formik.errors.confirmPassword) &&
                  //   formik.errors.confirmPassword
                  // }
                />
              </Grid>

              <Button
                type="submit"
                sx={{ width: "100%", height: "45px" }}
                variant="contained"
              >
                {signupReducer.loading ? (
                  <CircularProgress />
                ) : (
                  <div>Sign Up</div>
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </div>
    </Fragment>
  );
}

export default Registration;
