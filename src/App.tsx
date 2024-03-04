import React, { useState } from "react";
import "./App.css";
import { AddPizzaArg, pizzasAPI } from "./api";
import { AddItemForm } from "./component/AddItemForm";
import { Cards } from "./component/Cards";
import { useAppDispatch } from "./app/store";
import { thunkPizza } from "./app/slicePizzas";
import { Header } from "./component/header/Header";
import { Sidebar } from "./component/sidebar/Sidebar";
import { Login } from "./login/Login";

function App() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const addPizza = (values: AddPizzaArg) => {
    dispatch(thunkPizza.addPizza(values));
  };

  return (
    <div className="App">
      <Header handleOpen={handleOpen} />
      <Sidebar open={open} handleClose={handleClose} />

      <AddItemForm addItem={addPizza} />
      <Cards />
      <Login/>
    </div>
  );
}

export default App;
