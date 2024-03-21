import React, { useState } from "react";
import "./App.css";
import type { AppRootState } from "./app/store";
import { useAppDispatch } from "./app/store";
import { Header } from "./component/header/Header";
import { Sidebar } from "./component/sidebar/Sidebar";
import { AlertMessage } from "./component/alertMessage/AlertMessage";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Content } from "./component/Content";
import { authAction } from "./login/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: AppRootState) => state.app.status);
  // const isLoggedIn = useSelector(
  //   (state: AppRootState) => state.auth.isLoggedIn
  // );

  if (localStorage.getItem("token")) {
    dispatch(authAction.setIsLoggedIn({ value: true }));
  }
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
