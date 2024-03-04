import React from "react"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { loginTC } from "./authSlise"
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material"
import { AppRootStateType, useAppDispatch } from "../app/store"

export const Login = () => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

  const formik = useFormik({
    validate: (values) => {
      if (!values.username) {
        return {
          username: "username is required",
        }
      }
      if (!values.password) {
        return {
          password: "Password is required",
        }
      }
    },
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
  })

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField label="username" margin="normal" {...formik.getFieldProps("username")} />
              {formik.errors.username ? <div>{formik.errors.username}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
