import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { AddPizzaArg } from "../api/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

type AddItemFormPropsTyp = {
  addItem: (values: AddPizzaArg) => void;
  disabled?: boolean;
  initialValues?: AddPizzaArg;
  closeForm: () => void;
};

export const AddItemForm = React.memo(function (props: AddItemFormPropsTyp) {
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
    },
  });

  function handleClose() {
    props.closeForm();
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
        {props.initialValues?.name ? "Редактировать" : "Добавление пицц"}
      </DialogTitle>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "auto",
          width: "fit-content",
        }}
        onSubmit={formik.handleSubmit}
      >
        <div>
          <TextField
            fullWidth
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
            fullWidth
            margin="normal"
            variant="outlined"
            label="Введите описание пиццы"
            type="description"
            multiline
            maxRows={4}
            {...formik.getFieldProps("description")}
            disabled={props.disabled}
          />
          {formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        <DialogActions>
          <Button variant="contained" disabled={props.disabled} type={"submit"}>
            Добавить
          </Button>
          <Button onClick={handleClose}>Выход</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
