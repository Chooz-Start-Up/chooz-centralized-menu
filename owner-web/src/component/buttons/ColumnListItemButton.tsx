import * as React from "react";
import { Grid, ListItem, ListItemButton, Typography } from "@mui/material/";
import { ColumnListGeneralButtonProps } from "./interface";
import DeleteButtonWithWarningDialog from "./DeleteButtonWithWarningDialog";

const ColumnListItemButton: React.FC<ColumnListGeneralButtonProps> = (
  props: ColumnListGeneralButtonProps
) => {
  const { items, handleDeleteClick, setSelectedColumnIndex } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index < items.length) {
      setSelectedColumnIndex(index);
      setSelectedIndex(index);
    }
  };

  return (
    <>
      {items.map((item) => (
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
                title={props.deleteDialogTitle}
                label={props.deleteDialogLabel}
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

export default ColumnListItemButton;
