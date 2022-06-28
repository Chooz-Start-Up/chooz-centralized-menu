import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItemButton,
  TextField,
} from "@mui/material";
import React from "react";
import { EditMenuButtonWithDialogProps } from "./interface";

const EditMenuButtonWithDialog: React.FC<EditMenuButtonWithDialogProps> = (
  props: EditMenuButtonWithDialogProps
) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    title,
    label,
    textValue,
    handleEditRetrieveText,
    updateText,
    validateText,
  } = props;

  return (
    <>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "relative",
        }}
        onClick={handleClickOpen}
      >
        <EditIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditRetrieveText} id="myeditform">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={label}
              variant="standard"
              error={validateText() !== ""}
              helperText={validateText()}
              onChange={updateText}
              defaultValue={textValue}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="myeditform"
            disabled={validateText() !== ""}
            onClick={handleClose}
            sx={{ textTransform: "none" }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditMenuButtonWithDialog;
