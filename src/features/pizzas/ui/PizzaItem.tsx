import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import pizza from "./../../../common/img/pizza.avif";
import { AddItemForm } from "../../../common/components/addItemForm/AddItemForm";
import type { AddPizzaArg } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, type AppRootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { thunkPizza } from "../model/slicePizzas";

interface Props {
  name: string;
  description: string;
  pizzaId: string;
}

export const PizzaItem = (props: Props) => {
  const status = useSelector((state: AppRootState) => state.app.status);
  const dispatch = useAppDispatch();

  const [change, setChange] = React.useState(false);

  const deletePizza = () => {
    dispatch(thunkPizza.deletePizza(props.pizzaId));
  };

  const resetPizza = React.useCallback( () => {
    setChange(!change);
  }, [change])

  const updatePizza = React.useCallback(
    (pizzaArg: AddPizzaArg) => {
      dispatch(thunkPizza.updatePizza({ pizzaId: props.pizzaId, pizzaArg }));
      setChange(false);
    },
    [dispatch]
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 1,
        display: "grid",
        flexDirection: "column",
      }}
      style={{ position: "relative" }}
    >
      <CardMedia sx={{ height: 300 }} image={pizza} title="Pizza" />
      {change && (
        <AddItemForm
          addItem={updatePizza}
          initialValues={{ description: props.description, name: props.name }}
          closeForm={resetPizza}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={resetPizza}>
          Редактировать
        </Button>
        <Button size="small" onClick={deletePizza}>
          Удалить
        </Button>
      </CardActions>
      {status === "loading" && (
        <CircularProgress
          style={{ right: 0, bottom: 0, position: "absolute" }}
        />
      )}
    </Card>
  );
};
