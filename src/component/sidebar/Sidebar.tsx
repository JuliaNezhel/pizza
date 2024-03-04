import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export const Sidebar: FC<PropsType> = ({ open, handleClose }) => {
  return (
    <>
      <Drawer open={open} onClose={handleClose} style={{ maxWidth: 345 }}>
        <List></List>
        <ListItem key={"text"} disablePadding>
          <ListItemButton>Все пиццы</ListItemButton>
        </ListItem>
        <ListItem key={"text"} disablePadding>
          <ListItemButton>Добавить пиццу</ListItemButton>
        </ListItem>
      </Drawer>
    </>
  );
};
