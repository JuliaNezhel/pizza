import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState: {
    message: null as null | string,
    status: "idle" as RequestStatusType,
    isInitialized: false,
  },
  reducers: {
    setAppMessage: (
      state,
      action: PayloadAction<{ message: string | null }>
    ) => {
      state.message = action.payload.message;
    },
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) => {
      state.status = action.payload.status;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
