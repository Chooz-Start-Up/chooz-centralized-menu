import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
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

  const handleCancel = () => {
    updateText(null, "");
    if (type === "category" && props.updateDescriptionText !== undefined) {
      props.updateDescriptionText(null, "");
    }
    setOpen(false);
  };

  const {
    title,
    label,
    textValue,
    type,
    handleEditRetrieveText,
    updateText,
    validateText,
  } = props;

  useEffect(() => {
    if (open) {
      updateText(null, textValue);
      if (type === "category" && props.updateDescriptionText !== undefined) {
        props.updateDescriptionText(null, props.descriptionTextValue);
      }
    }
  }, [open]);

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
          <form
            onSubmit={handleEditRetrieveText}
            id="myeditform"
            autoComplete="off"
          >
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
            {type === "category" && (
              <TextField
                margin="dense"
                id="description"
                label={"Category Description (Optional)"}
                variant="standard"
                fullWidth
                multiline
                minRows={3}
                onChange={props.updateDescriptionText}
                defaultValue={props.descriptionTextValue}
                placeholder="General description for all items in the category"
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
