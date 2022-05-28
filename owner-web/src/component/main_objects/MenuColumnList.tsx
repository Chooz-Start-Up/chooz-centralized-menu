import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { MenuColumnListProps, MenuColumnListState } from "./interface";
import DeleteButtonWithWarningDialog from "../buttons/DeleteButtonWithWarningDialog";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";

export class MenuColumnList extends React.Component<
  MenuColumnListProps,
  MenuColumnListState
> {
  constructor(props: MenuColumnListProps) {
    super(props);

    this.state = {
      addingMenuName: "",
      menuItems: [],
    };
  }

  handleAddClick = () => {
    console.log("AddClick"); ////////////////////////////////////////////////////////////////////////////////////////////

    this.setState((state) => {
      console.log("Before Adding Item: ", state.menuItems);
      const items = state.menuItems.concat({
        id: state.menuItems.length,
        name: this.state.addingMenuName,
        handleDeleteClick: this.handleDeleteClick,
        categoryItems: [],
      });

      console.log("After Adding Item: ", items); ////////////////////////////////////////////////////////////////////

      return {
        menuItems: items,
      };
    });
  };

  handleDeleteClick = (id: number) => {
    console.log("MinusClick on: ", id); //////////////////////////////////////////////////////////////////////////////////

    const array = this.state.menuItems;

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
        menuItems: newArray,
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

  updateText = (e: any) => {
    this.setState(() => {
      return {
        addingMenuName: e.target.value,
      };
    });
  };

  validateText = (): string => {
    const emptyTextfieldErrorMsg: string = "Menu name cannot be empty.";
    return this.state.addingMenuName === "" ? emptyTextfieldErrorMsg : "";
  };

  render() {
    return (
      <>
        <Grid container spacing={0} bgcolor={"#ffebee"}>
          <Grid item xs={3}>
            <List>
              <Grid item xs={10}>
                {this.state.menuItems.map((item) => (
                  <ListItem disablePadding key={item.id}>
                    <ListItemButton>
                      <Grid item xs={10} textAlign="center">
                        <Typography>{item.name}</Typography>
                      </Grid>
                      <Grid item xs={1}>
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
                  <AddButtonWithDialog
                    addingMenuName={this.state.addingMenuName}
                    handleRetrieveText={this.handleRetrieveText}
                    updateText={this.updateText}
                    validateText={this.validateText}
                  />
                </ListItem>
              </Grid>
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
}
