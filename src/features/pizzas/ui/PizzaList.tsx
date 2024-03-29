import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { PizzaItem } from "./PizzaItem";
import { useSelector } from "react-redux";
import type { AppRootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/store";
import { NavLink, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { thunkPizza } from "../model/slicePizzas";

export const PizzaList = () => {
  const isLoggedIn = useSelector(
    (state: AppRootState) => state.auth.isLoggedIn
  );

  const dispatch = useAppDispatch();
  const allPizza = useSelector((state: AppRootState) => state.pizza.pizza);

  useEffect(() => {
    dispatch(thunkPizza.fetchPizza());
  }, []);



  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div>
        <NavLink to="/addPizza">
          <Button
            variant="contained"
            color="success"
            style={{ margin: "20px" }}
          >
            Добавить новую пиццу
          </Button>
        </NavLink>
      </div>
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
                <PizzaItem
                  name={el.name}
                  description={el.description}
                  pizzaId={el.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};
