import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pizzasAPI } from "../api/api";
import type { AddPizzaArg } from "../api/api";
import type { AppRootState, AppDispatch } from "../../../app/store";

import { appActions } from "../../../app/appSlice";

//  util
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: null;
  state: AppRootState;
  dispatch: AppDispatch;
}>();

const slice = createSlice({
  initialState: {
    pizza: [] as Pizza[],
  },
  name: "pizzas",
  reducers: {
    clearStatePizza: (state) => {
      state.pizza = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizza = action.payload.pizza;
      })
      .addCase(deletePizza.fulfilled, (state, action) => {
        const index = state.pizza.findIndex(
          (p) => p.id === action.payload.pizzaId
        );
        if (index !== -1) state.pizza.splice(index, 1);
      })
      .addCase(addPizza.fulfilled, (state, action) => {
        state.pizza.push(action.payload.pizza);
      })
      .addCase(updatePizza.fulfilled, (state, action) => {
        const index = state.pizza.findIndex(
          (p) => p.id === action.payload.pizzaId
        );
        state.pizza[index] = action.payload.pizza;
      });
  },
});

export interface Pizza {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// thunks

const fetchPizza = createAsyncThunk<{ pizza: Pizza[] }, undefined, any>(
  `${slice.name}/fetchPizza`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await pizzasAPI.fetchPizzas();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { pizza: res.data };
    } catch (e: any) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return rejectWithValue(null);
    }
  }
);

const deletePizza = createAppAsyncThunk<{ pizzaId: string }, string>(
  `${slice.name}/deletePizza`,
  async (pizzaId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      await pizzasAPI.deletePizza(pizzaId);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { pizzaId };
    } catch (e: any) {
      return rejectWithValue(null);
    }
  }
);

const addPizza = createAppAsyncThunk<{ pizza: Pizza }, AddPizzaArg>(
  `${slice.name}/addPizza`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await pizzasAPI.addPizza(arg);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(appActions.setAppMessage({ message: res.data.message }));
      return { pizza: res.data.pizza };
    } catch (e: any) {
      return rejectWithValue(null);
    }
  }
);

const updatePizza = createAppAsyncThunk<
  { pizza: Pizza; pizzaId: string },
  { pizzaArg: AddPizzaArg; pizzaId: string }
>(`${slice.name}/updatePizza`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await pizzasAPI.updatePizza(arg.pizzaId, arg.pizzaArg);
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    dispatch(appActions.setAppMessage({ message: res.data.message }));
    return { pizza: res.data.pizza, pizzaId: arg.pizzaId };
  } catch (e: any) {
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return rejectWithValue(null);
  }
});

export const pizzasReducer = slice.reducer;
export const pizzasAction = slice.actions;
export const thunkPizza = {
  fetchPizza,
  deletePizza: deletePizza,
  addPizza,
  updatePizza,
};
