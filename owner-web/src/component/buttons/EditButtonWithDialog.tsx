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
import { EditButtonWithDialogProps } from "./interface";

const EditButtonWithDialog: React.FC<EditButtonWithDialogProps> = (
  props: EditButtonWithDialogProps
) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, label, handleEditRetrieveText, updateText, validateText } =
    props;

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
        <EditIcon />
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
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            form="myeditform"
            disabled={validateText() !== ""}
            onClick={handleClose}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditButtonWithDialog;
