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

  const { addingMenuName, handleRetrieveText, updateText, validateText } =
    props;

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <Grid item xs={5}></Grid>
        <AddCircleOutlineIcon />
      </ListItemButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">Enter Menu Name</DialogTitle>
        <DialogContent>
          <form onSubmit={handleRetrieveText} id="myform">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Menu Name"
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
            disabled={addingMenuName === ""}
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
