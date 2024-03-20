import React, { useEffect, useState } from "react";
import "./App.css";
import { AddPizzaArg, pizzasAPI } from "./api/api";
import { AddItemForm } from "./component/AddItemForm";
import { AppRootStateType, useAppDispatch } from "./app/store";
import { Header } from "./component/header/Header";
import { Sidebar } from "./component/sidebar/Sidebar";
import { AlertMessage } from "./component/alertMessage/AlertMessage";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Content } from "./Contemt";
import { authAction } from "./login/authSlise";

function App() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: AppRootStateType) => state.app.status);
  const isLoggedIn = useSelector(
    (state: AppRootStateType) => state.auth.isLoggedIn
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authAction.setIsLoggedIn({ value: true }));
    }
  }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // if(!isLoggedIn) {
  //   debugger
  //   return <Navigate to={"/login"} />
  // }

  return (
    <div className="App">
      <AlertMessage />
      <Header handleOpen={handleOpen} />
      <Sidebar open={open} handleClose={handleClose} />
      {status === "loading" && <LinearProgress />}

      <Content />
      {/* <Routes>
        <Route
          element={<AddItemForm addItem={addPizza} closeForm={closeForm} />}
          path="/addPizza"
        />
        <Route element={<PizzaList />} path="/pizzas" />
        <Route element={<Login />} path="/login" />

        <Route element={<Navigate to={"/pizzas"} />} path="/*" />
      </Routes> */}
    </div>
  );
}

export default App;
