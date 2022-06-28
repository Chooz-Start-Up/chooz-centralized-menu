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
import { choozTheme } from "../../theme/theme";

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

  const handleCancel = () => {
    updateText(null, "");
    if (type === "category" && props.updateDescriptionText !== undefined) {
      props.updateDescriptionText(null, "");
    }
    setOpen(false);
  };

  const {
    type,
    title,
    label,
    handleAddRetrieveText,
    updateText,
    validateText,
  } = props;

  return (
    <>
      <ListItemButton selected={false} onClick={handleClickOpen} disableRipple>
        <Grid container justifyContent="center">
          <AddCircleOutlineIcon
            fontSize="large"
            sx={{ color: choozTheme.palette.primary.main }}
          />
        </Grid>
      </ListItemButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddRetrieveText} id="myform" autoComplete="off">
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
            {type === "category" && (
              <TextField
                margin="dense"
                id="description"
                label={"Category Description"}
                variant="standard"
                fullWidth
                multiline
                minRows={3}
                onChange={props.updateDescriptionText}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="myform"
            disabled={validateText() !== ""}
            onClick={handleClose}
            sx={{ textTransform: "none" }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddButtonWithDialog;
