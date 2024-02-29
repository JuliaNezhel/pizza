import React from "react";
import "./App.css";
import { AddPizzaArg, pizzasAPI } from "./api";
import Header from "./conponent/Header";
import { AddItemForm } from "./conponent/AddItemForm";
import { Cards } from "./conponent/Cards";
import {  useAppDispatch } from "./app/store";
import { thunkPizza } from "./app/slisePizzas";


function App() {
  const dispath = useAppDispatch();


  const addPizza = (values: AddPizzaArg) => {
    dispath(thunkPizza.addPizza(values));
  };

  return (
    <div className="App">
      <Header />
      <AddItemForm addItem={addPizza} />
      <Cards />
    </div>
  );
}

export default App;
