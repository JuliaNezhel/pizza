import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
// import { loginTC } from "./authSlice";
import { Button, FormControl, FormGroup, Grid, TextField } from "@mui/material";
import type { AppRootState } from "../app/store";
import { useAppDispatch } from "../app/store";
import { Navigate } from "react-router-dom";
import { thunkAuth } from "./authSlice";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(
    (state: AppRootState) => state.auth.isLoggedIn
  );

  const formik = useFormik({
    validate: (values) => {
      if (!values.username) {
        return {
          username: "username is required",
        };
      }
      if (!values.password) {
        return {
          password: "password is required",
        };
      }
    },
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(thunkAuth.logIn({data: values}));
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/pizza" />;
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                label="username"
                margin="normal"
                {...formik.getFieldProps("username")}
              />
              {formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
