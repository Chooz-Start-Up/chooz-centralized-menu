import * as React from "react";
import { Grid, ListItem, ListItemButton, Typography } from "@mui/material/";
import { MenuListItemButtonProps } from "./interface";
import DeleteButtonWithWarningDialog from "./DeleteButtonWithWarningDialog";

const MenuListItemButton: React.FC<MenuListItemButtonProps> = (
  props: MenuListItemButtonProps
) => {
  const { menuItems, handleDeleteClick, setSelectedMenuIndex } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setSelectedMenuIndex(index);
  };

  return (
    <>
      {menuItems.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            selected={selectedIndex === item.id}
            onClick={(event) => handleListItemClick(event, item.id)}
          >
            <Grid item xs={10} textAlign="center">
              <Typography>{item.name}</Typography>
            </Grid>
            <Grid item xs={1}>
              <DeleteButtonWithWarningDialog
                deleteAction={handleDeleteClick}
                id={item.id}
              />
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export default MenuListItemButton;
