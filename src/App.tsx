import React, { useState } from "react";
import "./App.css";
import { AddPizzaArg, pizzasAPI } from "./api";
import { AddItemForm } from "./component/AddItemForm";
import { Cards } from "./component/Cards";
import { AppRootStateType, useAppDispatch } from "./app/store";
import { thunkPizza } from "./app/slicePizzas";
import { Header } from "./component/header/Header";
import { Sidebar } from "./component/sidebar/Sidebar";
import { Login } from "./login/Login";
import Button from "@mui/material/Button";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AlertMessage } from "./component/alertMessage/AlertMessage";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: AppRootStateType) => state.app.status);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const history = useNavigate();

  const addPizza = (values: AddPizzaArg) => {
    dispatch(thunkPizza.addPizza(values));
  };

  const closeForm = () => {
    history("/pizzas");
  };

  return (
    <div className="App">
      <AlertMessage />
      <Header handleOpen={handleOpen} />
      <Sidebar open={open} handleClose={handleClose} />
      {status === "loading" && <LinearProgress />}

      <NavLink to={"/addPizza"}>
        <Button
          variant={"contained"}
          color="success"
          style={{ margin: "20px" }}
        >
          Добавить новую пиццу
        </Button>
      </NavLink>
      <Routes>
        <Route
          element={<AddItemForm addItem={addPizza} closeForm={closeForm} />}
          path="/addPizza"
        />
        <Route element={<Cards />} path="/pizzas" />
        <Route element={<Navigate to={"/pizzas"} />} path="/*" />
      </Routes>

      <Login />
    </div>
  );
}

export default App;
