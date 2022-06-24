import * as React from "react";
import { Fade, Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { ItemColumnListProps } from "./interface";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export class ItemColumnList extends React.Component<ItemColumnListProps> {
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.props.onItemDragEnd}>
          <Droppable
            droppableId="droppableItemList"
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
                      deleteDialogTitle="Are you sure you want to delete the item?"
                      deleteDialogLabel="All item information will be deleted."
                      editDialogTitle="Enter New Item Name"
                      editDialogLabel="New Item Name"
                      handleEditRetrieveText={
                        this.props.handleItemEditRetrieveText
                      }
                      updateText={this.props.updateText}
                      validateText={this.props.validateText}
                      items={this.props.itemItems}
                      isPublished={this.props.isPublished}
                      handleDeleteClick={this.props.handleItemDeleteClick}
                      setSelectedColumnIndex={this.props.setSelectedItemIndex}
                    />
                  </Grid>
                  {!this.props.isPublished && (
                    <Grid item xs={12}>
                      <ListItem disablePadding alignItems="center">
                        <AddButtonWithDialog
                          title="Enter Item Name"
                          label="Item Name"
                          handleAddRetrieveText={
                            this.props.handleItemAddRetrieveText
                          }
                          updateText={this.props.updateText}
                          validateText={this.props.validateText}
                        />
                      </ListItem>
                    </Grid>
                  )}
                </List>
              </Fade>
            )}
          </Droppable>{" "}
        </DragDropContext>
      </>
    );
  }
}
