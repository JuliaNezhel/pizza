import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AddItemForm } from "./AddItemForm";
import { useAppDispatch } from "../app/store";
import { thunkPizza } from "../app/slicePizzas";
import { PizzaList } from "./PizzaList";
import { Login } from "../login/Login";
import type { AddPizzaArg } from "../api/api";


export const Content = () => {

  const dispatch = useAppDispatch();
  const history = useNavigate();


  const addPizza = (values: AddPizzaArg) => {
    dispatch(thunkPizza.addPizza(values));
  };

  const closeForm = () => {
    history("/pizzas");
  };


return (
  <Routes>
  <Route
    element={<AddItemForm addItem={addPizza} closeForm={closeForm} />}
    path="/addPizza"
  />
  <Route element={<PizzaList />} path="/pizzas" />
  <Route element={<Login />} path="/login" />

  <Route element={<Navigate to="/pizzas" />} path="/*" />
</Routes>
)
}