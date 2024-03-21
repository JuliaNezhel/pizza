import React, { useState } from "react";
import "./App.css";
import type { AppRootState } from "./store";
import { useAppDispatch } from "./store";
import { Header } from "../common/components/header/Header";
import { Sidebar } from "../common/components/sidebar/Sidebar";
import { AlertMessage } from "../common/components/alertMessage/AlertMessage";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Content } from "../common/components/content/Content";
import { authAction } from "../features/login/model/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: AppRootState) => state.app.status);

  if (localStorage.getItem("token")) {
    dispatch(authAction.setIsLoggedIn({ value: true }));
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
