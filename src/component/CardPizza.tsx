import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import pizza from "../assets/img/pizza.avif";
import { AddItemForm } from "./AddItemForm";
import { AddPizzaArg } from "../api";
import { NavLink } from "react-router-dom";

type PropsType = {
  name: string;
  description: string;
  pizzaId: string;
  deletePizza: (pizzaId: string) => void;
  updatePizza: (pizzaId: string, pizzaArg: AddPizzaArg) => void;
};

export const CardPizza = (props: PropsType) => {
  const [change, setChange] = React.useState(false);

  const deletePizza = () => {
    props.deletePizza(props.pizzaId);
  };

  const resetPizza = () => {
    setChange(!change);
  };

  const updatePizza = (values: AddPizzaArg) => {
    props.updatePizza(props.pizzaId, values);
    setChange(false);
  };

  return (
    <Card sx={{ maxWidth: 345 , height: 1, display: 'grid', flexDirection: 'column' }}>
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
    </Card>
  );
};
