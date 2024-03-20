import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AddItemForm } from "./component/AddItemForm";
import { AppRootStateType, useAppDispatch } from "./app/store";
import { thunkPizza } from "./app/slicePizzas";
import { PizzaList } from "./component/PizzaList";
import { Login } from "./login/Login";
import { AddPizzaArg } from "./api/api";
import { useSelector } from "react-redux";




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

  <Route element={<Navigate to={"/pizzas"} />} path="/*" />
</Routes>
)
}