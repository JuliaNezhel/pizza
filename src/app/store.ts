import  { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import { pizzasReducer } from "./slicePizzas";
import { useDispatch } from "react-redux";
import { authReducer } from "../login/authSlise";


export const store = configureStore({
  reducer: {
    pizza: pizzasReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  UnknownAction
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  UnknownAction
>;
