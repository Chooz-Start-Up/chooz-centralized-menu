import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  ThemeProvider,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material/";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { ItemProps, UserDataAPI } from "./interface";
import axios from "axios";
import { Container } from "@mui/system";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export interface CategoryItemProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffebee",
  width: 180,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export interface MenuListProps {
  handleClickOpen(): any;
  handleClose(): any;
  open: any;
}

export interface MenuListState {
  addingMenuName: string;
  items: CategoryItemProps[];
}

export class MenuList extends React.Component<MenuListProps, MenuListState> {
  constructor(props: MenuListProps) {
    super(props);

    this.state = {
      addingMenuName: "",
      items: [],
    };
  }

  handleAddClick = () => {
    console.log("AddClick"); ////////////////////////////////////////////////////////////////////////////////////////////

    this.setState((state) => {
      console.log("Before Adding Item: ", state.items);
      const items = state.items.concat({
        id: state.items.length,
        name: this.state.addingMenuName,
        handleDeleteClick: this.handleDeleteClick,
      });

      console.log("After Adding Item: ", items); ////////////////////////////////////////////////////////////////////

      return {
        items,
      };
    });
  };

  handleDeleteClick = (id: number) => {
    console.log("MinusClick on: ", id); //////////////////////////////////////////////////////////////////////////////////

    const array = this.state.items;

    console.log("Before Removing Item: ", array); ///////////////////////////////////////////////////////////////////////

    let newArray = array.filter(function logic(element) {
      console.log(element.id, "---", id);
      return element.id !== id;
    });
    for (let i = 0; i < newArray.length; i++) {
      console.log("For loop update: ", newArray[i].id, " to ", i); ///////////////////////////////////////////////////////
      newArray[i].id = i;
    }
    console.log("After Removing Item: ", newArray); ///////////////////////////////////////////////////////////////////////

    this.setState(() => {
      return {
        items: newArray,
      };
    });
  };

  handleRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingMenuName);
    this.handleAddClick();
    this.setState(() => {
      return {
        addingMenuName: "",
      };
    });
  };

  validateText = (): string => {
    const emptyTextfieldErrorMsg: string = "Menu name cannot be empty.";
    return this.state.addingMenuName === "" ? emptyTextfieldErrorMsg : "";
  };

  render() {
    const { handleClickOpen, handleClose, open } = this.props;

    return (
      <>
        <Grid container spacing={0} bgcolor={"#ffebee"}>
          <Grid item xs={3}>
            <List>
              <Grid item xs={10}>
                {this.state.items.map((item) => (
                  <ListItem disablePadding key={item.id}>
                    <ListItemButton>
                      <Grid item xs={13} textAlign="center">
                        <Typography>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        {/* <IconButton
                          aria-label="delete"
                          size="small"
                          sx={{
                            position: "relative",
                            top: 0,
                            left: 0,
                          }}
                          onClick={() => this.handleDeleteClick(item.id)}
                        >
                          <ClearIcon />
                        </IconButton> */}
                        <DeleteButtonWithWarningDialog
                          deleteAction={this.handleDeleteClick}
                          id={item.id}
                        />
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Grid>
              <Grid item xs={10}>
                <ListItem disablePadding alignItems="center">
                  <ListItemButton onClick={handleClickOpen}>
                    <Grid item xs={5}></Grid>
                    <AddCircleOutlineIcon />
                  </ListItemButton>
                </ListItem>
              </Grid>
            </List>
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle color="primary">Enter Menu Name</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleRetrieveText} id="myform">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Menu Name"
                variant="standard"
                error={this.validateText() !== ""}
                helperText={this.validateText()}
                onChange={(e) =>
                  this.setState(() => {
                    return {
                      addingMenuName: e.target.value,
                    };
                  })
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              form="myform"
              disabled={this.state.addingMenuName === ""}
              onClick={handleClose}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuList
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}

interface DeleteButtonWithWarningDialog {
  id: number;
  deleteAction(id: number): any;
}

const DeleteButtonWithWarningDialog: React.FC<DeleteButtonWithWarningDialog> = (
  props: DeleteButtonWithWarningDialog
) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    props.deleteAction(props.id);
    setOpen(false);
  };

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
        <ClearIcon />
      </IconButton>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete the menu?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            All items in the menu will be deleted as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
