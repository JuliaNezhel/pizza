import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import type { AppRootState } from "../../../app/store";
import { thunkAuth } from "../../../features/login/model/authSlice";
import { useSelector } from "react-redux";

interface PropsType {
  handleOpen: () => void;
}

export const Header: React.FC<PropsType> = ({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(
    (state: AppRootState) => state.auth.isLoggedIn
  );

  const logOut = () => {
    dispatch(thunkAuth.logOut(undefined));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        // position="static"
        position="sticky"
      >
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pizza
          </Typography>
          <NavLink to="/login">
            <Button color="inherit" style={{ color: "white" }} onClick={logOut}>
              {isLoggedIn ? "выход" : "Вход"}
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
