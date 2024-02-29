import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddPizzaArg, pizzasAPI } from "../api";
import { AppDispatch, AppRootStateType } from "./store";

//util
const createAppAsycThunk = createAsyncThunk.withTypes<{
  rejectValue: null;
  state: AppRootStateType;
  dispatch: AppDispatch;
}>();

const slice = createSlice({
  initialState: {
    pizza: [] as Pizza[],
  },
  name: "pizzas",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.pizza = action.payload.pizza;
      })
      .addCase(delitePizza.fulfilled, (state, action) => {
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

export type Pizza = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// thunks

const fetchPizza = createAsyncThunk<{ pizza: Pizza[] }, undefined, any>(
  `${slice.name}/fetchPizza`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await pizzasAPI.fethPizzas();
      return { pizza: res.data };
    } catch (e: any) {
      return rejectWithValue(null);
    }
  }
);

const delitePizza = createAppAsycThunk<{ pizzaId: string }, string>(
  `${slice.name}/delitePizza`,
  async (pizzaId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await pizzasAPI.delitePizza(pizzaId);
      return { pizzaId };
    } catch (e: any) {
      return rejectWithValue(null);
    }
  }
);

const addPizza = createAppAsycThunk<{ pizza: Pizza }, AddPizzaArg>(
  `${slice.name}/addPizza`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await pizzasAPI.addPizza(arg);
      dispatch(fetchPizza());
      return { pizza: res.data };
    } catch (e: any) {
      return rejectWithValue(null);
    }
  }
);

const updatePizza = createAppAsycThunk<
  { pizza: Pizza; pizzaId: string },
  { pizzaArg: AddPizzaArg; pizzaId: string }
>(`${slice.name}/updatePizza`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await pizzasAPI.updatePizza(arg.pizzaId, arg.pizzaArg);
    return { pizza: res.data.pizza, pizzaId: arg.pizzaId };
  } catch (e: any) {
    return rejectWithValue(null);
  }
});

export const pizzasReduser = slice.reducer;
export const pizzasAction = slice.actions;
export const thunkPizza = { fetchPizza, delitePizza, addPizza, updatePizza };
