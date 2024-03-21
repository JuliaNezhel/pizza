import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AddItemForm } from "../addItemForm/AddItemForm";
import { useAppDispatch } from "../../../app/store";
import { thunkPizza } from "../../../features/pizzas/model/slicePizzas";
import { PizzaList } from "../../../features/pizzas/ui/PizzaList";
import type { AddPizzaArg } from "../../../features/pizzas/api/api";
import { Login } from "../../../features/login/ui/Login";


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