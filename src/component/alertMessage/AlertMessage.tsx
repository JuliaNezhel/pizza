import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../app/store";
import { appActions } from "../../app/appSlice";

export const AlertMessage = () => {
  const message = useSelector((state: AppRootStateType) => state.app.message);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(appActions.setAppMessage({ message: null }));
  };

  const isOpen = message !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
