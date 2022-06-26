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
import EditMenuButtonWithDialog from "./EditMenuButtonWithDialog";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core";
import { choozTheme } from "../../theme/theme";

const ColumnListItemButton: React.FC<ColumnListGeneralButtonProps> = (
  props: ColumnListGeneralButtonProps
) => {
  const {
    items,
    deleteDialogTitle,
    deleteDialogLabel,
    editDialogTitle,
    editDialogLabel,
    isPublished,
    handleDeleteClick,
    handleEditRetrieveText,
    updateText,
    validateText,
    setSelectedColumnIndex,
  } = props;

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index < items.length) {
      setSelectedColumnIndex(index);
    }
  };

  const useStyles = makeStyles({
    draggingListItem: {
      background: choozTheme.palette.secondary.main,
    },
  });

  const classes = useStyles();

  return (
    <>
      {items.map((item, index) => (
        <Draggable
          key={item.id}
          draggableId={item.id.toString()}
          index={index}
          isDragDisabled={isPublished}
        >
          {(provided, snapshot) => (
            <ListItem
              disablePadding
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={snapshot.isDragging ? classes.draggingListItem : ""}
            >
              <ListItemButton
                sx={{
                  height: 50,
                }}
                selected={setSelectedColumnIndex() === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
              >
                <Grid container maxWidth="150px">
                  <Typography
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {item.name}
                  </Typography>
                </Grid>

                <Grid container justifyContent="flex-end">
                  {!isPublished && setSelectedColumnIndex() === item.id && (
                    <EditMenuButtonWithDialog
                      title={editDialogTitle}
                      label={editDialogLabel}
                      textValue={item.name}
                      handleEditRetrieveText={handleEditRetrieveText}
                      updateText={updateText}
                      validateText={validateText}
                    />
                  )}

                  {!isPublished && setSelectedColumnIndex() === item.id && (
                    <DeleteButtonWithWarningDialog
                      title={deleteDialogTitle}
                      label={deleteDialogLabel}
                      deleteAction={handleDeleteClick}
                      id={item.id}
                    />
                  )}
                </Grid>
              </ListItemButton>
            </ListItem>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default ColumnListItemButton;
