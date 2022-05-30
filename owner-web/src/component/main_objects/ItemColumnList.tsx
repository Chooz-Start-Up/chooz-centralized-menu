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
              deleteDialogLabel="All items information will be deleted."
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
                handleRetrieveText={this.props.handleItemRetrieveText}
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
