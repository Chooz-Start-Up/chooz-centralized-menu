import * as React from "react";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { ItemColumnListProps } from "./interface";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";

export class ItemColumnList extends React.Component<ItemColumnListProps> {
  render() {
    return (
      <>
        <List component="nav">
          <Grid item xs={12}>
            <ColumnListItemButton
              deleteDialogTitle="Are you sure you want to delete the item?"
              deleteDialogLabel="All item information will be deleted."
              editDialogTitle="Enter New Item Name"
              editDialogLabel="New Item Name"
              handleEditRetrieveText={this.props.handleItemEditRetrieveText}
              updateText={this.props.updateText}
              validateText={this.props.validateText}
              items={this.props.itemItems}
              handleDeleteClick={this.props.handleItemDeleteClick}
              setSelectedColumnIndex={this.props.setSelectedItemIndex}
            />
          </Grid>
          <Grid item xs={12}>
            <ListItem disablePadding alignItems="center">
              <AddButtonWithDialog
                title="Enter Item Name"
                label="Item Name"
                handleAddRetrieveText={this.props.handleItemAddRetrieveText}
                updateText={this.props.updateText}
                validateText={this.props.validateText}
              />
            </ListItem>
          </Grid>
        </List>
      </>
    );
  }
}