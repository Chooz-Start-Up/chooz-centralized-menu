import * as React from "react";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { CategoryColumnListProps } from "./interface";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";

export class CategoryColumnList extends React.Component<CategoryColumnListProps> {
  render() {
    return (
      <>
        <List component="nav">
          <Grid item xs={12}>
            <ColumnListItemButton
              deleteDialogTitle="Are you sure you want to delete the category?"
              deleteDialogLabel="All items in the category will be deleted as well."
              items={this.props.categoryItems}
              handleDeleteClick={this.props.handleCategoryDeleteClick}
              setSelectedColumnIndex={this.props.setSelectedCategoryIndex}
            />
          </Grid>
          <Grid item xs={12}>
            <ListItem disablePadding alignItems="center">
              <AddButtonWithDialog
                title="Enter Category Name"
                label="Category Name"
                handleRetrieveText={this.props.handleCategoryRetrieveText}
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
