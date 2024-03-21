import type  { ThunkAction, ThunkDispatch } from "redux-thunk";
import type { UnknownAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { pizzasReducer } from "./slicePizzas";
import { useDispatch } from "react-redux";
import { authReducer } from "../login/authSlice";
import { appReducer } from "./appSlice";


export const store = configureStore({
  reducer: {
    pizza: pizzasReducer,
    auth: authReducer,
    app: appReducer
  },
});

export type AppRootState = ReturnType<typeof store.getState>;

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  UnknownAction
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;

//  @ts-ignore
window.store = store