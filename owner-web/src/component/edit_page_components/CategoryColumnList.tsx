import * as React from "react";
import { Fade, Grid, List, ListItem } from "@mui/material/";
import { CategoryColumnListProps } from "./interface";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export class CategoryColumnList extends React.Component<CategoryColumnListProps> {
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.props.onCategoryDragEnd}>
          <Droppable
            droppableId="droppableCategoryList"
            isDropDisabled={this.props.isPublished}
          >
            {(provided) => (
              <Fade
                in={true}
                exit={false}
                mountOnEnter
                unmountOnExit
                timeout={275}
              >
                <List
                  component="nav"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Grid item xs={12}>
                    <ColumnListItemButton
                      type="category"
                      deleteDialogTitle="Are you sure you want to delete the category?"
                      deleteDialogLabel="All items in the category will be deleted as well."
                      editDialogTitle="Enter New Category Name"
                      editDialogLabel="New Category Name"
                      handleEditRetrieveText={
                        this.props.handleCategoryEditRetrieveText
                      }
                      updateText={this.props.updateText}
                      validateText={this.props.validateText}
                      items={this.props.categoryItems}
                      isPublished={this.props.isPublished}
                      handleDeleteClick={this.props.handleCategoryDeleteClick}
                      setSelectedColumnIndex={
                        this.props.setSelectedCategoryIndex
                      }
                      updateDescriptionText={this.props.updateDescriptionText}
                    />
                  </Grid>
                  {!this.props.isPublished && (
                    <Grid item xs={12}>
                      <ListItem disablePadding alignItems="center">
                        <AddButtonWithDialog
                          type="category"
                          title="Enter Category Name"
                          label="Category Name"
                          handleAddRetrieveText={
                            this.props.handleCategoryAddRetrieveText
                          }
                          updateText={this.props.updateText}
                          validateText={this.props.validateText}
                          updateDescriptionText={
                            this.props.updateDescriptionText
                          }
                        />
                      </ListItem>
                    </Grid>
                  )}
                </List>
              </Fade>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}
