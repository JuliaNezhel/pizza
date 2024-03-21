import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const Sidebar = ({ open, handleClose }: Props) => {
  return (
    <Drawer open={open} onClose={handleClose} style={{ maxWidth: 345 }}>
      <Box sx={{ width: 250, m: 2 }} role="presentation" onClick={handleClose}>
        <List>
          <ListItem key="text" disablePadding>
            <NavLink to="pizzas">
              <ListItemButton>Все пиццы</ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem key="addForm" disablePadding>
            <NavLink to="addPizza">
              <ListItemButton>Добавить пиццу</ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
