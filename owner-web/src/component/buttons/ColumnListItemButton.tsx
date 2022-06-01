import * as React from "react";
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material/";
import { ColumnListGeneralButtonProps } from "./interface";
import DeleteButtonWithWarningDialog from "./DeleteButtonWithWarningDialog";
import EditButtonWithDialog from "./EditButtonWithDialog";

const ColumnListItemButton: React.FC<ColumnListGeneralButtonProps> = (
  props: ColumnListGeneralButtonProps
) => {
  const {
    items,
    deleteDialogTitle,
    deleteDialogLabel,
    editDialogTitle,
    editDialogLabel,
    handleDeleteClick,
    handleEditRetrieveText,
    updateText,
    validateText,
    setSelectedColumnIndex,
  } = props;
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index < items.length) {
      setSelectedColumnIndex(index);
    }
  };

  return (
    <>
      {items.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            sx={{ height: 50 }}
            selected={setSelectedColumnIndex() === item.id}
            onClick={(event) => handleListItemClick(event, item.id)}
          >
            <Grid container maxWidth={140}>
              <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                {item.name}
              </Typography>
            </Grid>

            {setSelectedColumnIndex() === item.id && (
              <Grid item xs={2}>
                <EditButtonWithDialog
                  title={editDialogTitle}
                  label={editDialogLabel}
                  value={item.name}
                  handleEditRetrieveText={handleEditRetrieveText}
                  updateText={updateText}
                  validateText={validateText}
                />
              </Grid>
            )}

            {setSelectedColumnIndex() === item.id && (
              <Grid item xs={1.5}>
                <DeleteButtonWithWarningDialog
                  title={deleteDialogTitle}
                  label={deleteDialogLabel}
                  deleteAction={handleDeleteClick}
                  id={item.id}
                />
              </Grid>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export default ColumnListItemButton;
