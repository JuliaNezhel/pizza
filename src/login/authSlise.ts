import { Dispatch } from "redux";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { AuthArg, pizzasAPI } from "../api/api";
import { pizzasAction } from "../app/slicePizzas";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state, action)=> {
      state.isLoggedIn = action.payload.value;
    })
  }
});

// thunks
export const loginTC =
  (data: AuthArg): AppThunk =>
  (dispatch) => {
    pizzasAPI
      .authToken(data)
      .then((res) => {
        dispatch(authAction.setIsLoggedIn({ value: true }));
        localStorage.setItem("token", res.data.accessToken);
      })
      .catch((error) => {});
  };

const logOut = createAsyncThunk<{value: false}, any, any>(
  `${slice.name}/logOut`,
  (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(authAction.setIsLoggedIn({ value: false }));
    localStorage.removeItem("token");
    dispatch(pizzasAction.clearStatePizza(undefined))
    return { value: false }
  }
);
export const authReducer = slice.reducer;
export const authAction = slice.actions;
export const thunkAuth = {logOut}
