import * as React from "react";
import {
  Box,
  createTheme,
  Grid,
  ListItem,
  ListItemButton,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  Typography,
} from "@mui/material/";
import { ColumnListGeneralButtonProps } from "./interface";
import DeleteButtonWithWarningDialog from "./DeleteButtonWithWarningDialog";
import EditMenuButtonWithDialog from "./EditMenuButtonWithDialog";
import { Draggable } from "react-beautiful-dnd";
import makeStyles from '@mui/styles/makeStyles';
import { choozTheme } from "../../theme/theme";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
    type,
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
              // className={snapshot.isDragging ? classes.draggingListItem : ""}
            >
              <ListItemButton
                selected={setSelectedColumnIndex() === item.id}
                onClick={(event) => handleListItemClick(event, item.id)}
                sx={{
                  height: "60",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "grey.200",
                    "&.Mui-focusVisible": {
                      backgroundColor: "grey.200",
                    },
                    "&:hover": {
                      backgroundColor: "grey.300",
                    },
                  },
                }}
              >
                <Box width="100%" display="flex" justifyContent="space-between">
                  <Box width={isPublished ? "100%" : "60%"}>
                    <Typography
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {item.name}
                    </Typography>
                  </Box>

                  <Box width="60" height="25" maxHeight="65">
                    {!isPublished && setSelectedColumnIndex() === item.id && (
                      <EditMenuButtonWithDialog
                        type={type}
                        title={editDialogTitle}
                        label={editDialogLabel}
                        textValue={item.name}
                        handleEditRetrieveText={handleEditRetrieveText}
                        updateText={updateText}
                        validateText={validateText}
                        updateDescriptionText={
                          type === "category"
                            ? props.updateDescriptionText
                            : undefined
                        }
                        descriptionTextValue={
                          type === "category" ? item.description : undefined
                        }
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
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default ColumnListItemButton;
