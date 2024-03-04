import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { AuthArg, pizzasAPI } from "../api";

const slise = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
  },
});
export const authReducer = slise.reducer;
export const authAction = slise.actions;

// thunks
export const loginTC =
  (data: AuthArg): AppThunk =>
  (dispatch) => {
    pizzasAPI
      .authToken(data)
      .then((res) => {
        dispatch(authAction.setIsLoggedIn({ value: true }));
        dispatch(authAction.setToken({ token: res.data }));
      })
      .catch((error) => {});
  };
