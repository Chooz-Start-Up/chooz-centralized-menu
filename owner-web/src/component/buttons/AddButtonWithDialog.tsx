import * as React from "react";
import {
  Button,
  Dialog,
  Grid,
  ListItemButton,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material/";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddButtonWithDialogProps } from "./interface";

const AddButtonWithDialog: React.FC<AddButtonWithDialogProps> = (
  props: AddButtonWithDialogProps
) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, label, handleAddRetrieveText, updateText, validateText } =
    props;

  return (
    <>
      <ListItemButton selected={false} onClick={handleClickOpen}>
        <Grid container justifyContent="center">
          <AddCircleOutlineIcon fontSize="large" sx={{ color: "#ef5350" }} />
        </Grid>
      </ListItemButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddRetrieveText} id="myform">
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
            form="myform"
            disabled={validateText() !== ""}
            onClick={handleClose}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButtonWithDialog;
