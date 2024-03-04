import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CardPizza } from "./CardPizza";
import { AddPizzaArg } from "../api";
import { thunkPizza } from "../app/slicePizzas";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../app/store";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const allPizza = useSelector((state: AppRootStateType) => state.pizza.pizza);

  useEffect(() => {
    dispatch(thunkPizza.fetchPizza());
  }, []);

  const deletePizza = (pizzaId: string) => {
    dispatch(thunkPizza.deletePizza(pizzaId));
  };

  const updatePizza = (pizzaId: string, pizzaArg: AddPizzaArg) => {
    dispatch(thunkPizza.updatePizza({ pizzaArg, pizzaId }));
  };

  return (
    <Box sx={{ width: "95%" }} component="section" style={{ margin: "20px" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
      >
        {allPizza?.map((el) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={el.id}>
              <CardPizza
                name={el.name}
                description={el.description}
                pizzaId={el.id}
                deletePizza={deletePizza}
                updatePizza={updatePizza}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
