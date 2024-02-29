import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { AddBox } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useAppDispatch } from "../app/store";
import { thunkPizza } from "../app/slisePizzas";
import { AddPizzaArg } from "../api";

type AddItemFormPropsTyp = {
  addItem: (values: AddPizzaArg) => void;
  disabled?: boolean;
  initialValues?: AddPizzaArg;
};

export const AddItemForm = React.memo(function (props: AddItemFormPropsTyp) {
  const dispath = useAppDispatch();

  const formik = useFormik({
    validate: (values) => {
      if (!values.name) {
        return {
          name: "Введите название",
        };
      }
      if (!values.description) {
        return {
          description: "Введите описание",
        };
      }
    },
    initialValues: {
      name: props.initialValues?.name ? props.initialValues?.name : "",
      description: props.initialValues?.description
        ? props.initialValues?.description
        : "",
    },
    onSubmit: (values) => {
      props.addItem(values);
      formik.resetForm();
      // alert(JSON.stringify(values));
    },
  });

  return (
    <div className="addItenForm">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            variant="outlined"
            label="Введите название пиццы"
            margin="normal"
            type="name"
            {...formik.getFieldProps("name")}
            disabled={props.disabled}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Введите описание пиццы"
            type="description"
            {...formik.getFieldProps("description")}
            disabled={props.disabled}
          />
          {formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>

        <Button
          variant="contained"
          onClick={() => {}}
          disabled={props.disabled}
          type={"submit"}
        >
          Добавить
        </Button>
      </form>
    </div>
  );
});
