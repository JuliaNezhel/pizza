import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthArg } from "../api/api";
import { pizzasAction } from "../app/slicePizzas";
import { authAPI } from "../api/authApi";

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
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.value;
    });
  },
});

// thunks

export const logIn= createAsyncThunk<any, { data: AuthArg }, any>(
  `${slice.name}/logIn`,
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const res = await authAPI.authToken(arg.data);
      dispatch(authAction.setIsLoggedIn({ value: true }));
      localStorage.setItem("token", res.data.accessToken);
      return { value: true };
    } catch {}
  }
);

const logOut = createAsyncThunk<{ value: false }, any, any>(
  `${slice.name}/logOut`,
  (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(authAction.setIsLoggedIn({ value: false }));
    localStorage.removeItem("token");
    dispatch(pizzasAction.clearStatePizza(undefined));
    return { value: false };
  }
);
export const authReducer = slice.reducer;
export const authAction = slice.actions;
export const thunkAuth = { logOut, logIn };
