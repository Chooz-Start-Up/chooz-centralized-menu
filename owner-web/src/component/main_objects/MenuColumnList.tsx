import * as React from "react";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { MenuColumnListProps, MenuColumnListState } from "./interface";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import { CategoryColumnList } from "./CategoryColumnList";
import { ItemColumnList } from "./ItemColumnList";
import { ItemColumnPage } from "./ItemColumnPage";

export class MenuColumnList extends React.Component<
  MenuColumnListProps,
  MenuColumnListState
> {
  constructor(props: MenuColumnListProps) {
    super(props);

    this.state = {
      addingItemName: "",
      menuItems: [],
      selectedMenuIndex: -1,
      selectedCategoryIndex: -1,
      selectedItemIndex: -1,
    };
  }

  validateMenuIndexBeforeRender = (): number => {
    if (this.state.selectedMenuIndex < this.state.menuItems.length) {
      return this.state.selectedMenuIndex;
    } else {
      return -1;
    }
  };

  validateCategoryIndexBeforeRender = (): number => {
    if (
      this.validateMenuIndexBeforeRender() !== -1 &&
      this.state.selectedCategoryIndex <
        this.state.menuItems[this.state.selectedMenuIndex].categoryItems.length
    ) {
      return this.state.selectedCategoryIndex;
    } else {
      return -1;
    }
  };
  validateItemIndexBeforeRender = (): number => {
    if (
      this.validateMenuIndexBeforeRender() !== -1 &&
      this.validateCategoryIndexBeforeRender() !== -1 &&
      this.state.selectedItemIndex <
        this.state.menuItems[this.state.selectedMenuIndex].categoryItems[
          this.state.selectedCategoryIndex
        ].items.length
    ) {
      return this.state.selectedItemIndex;
    } else {
      return -1;
    }
  };

  handleMenuAddClick = () => {
    this.setState(() => {
      const items = this.state.menuItems.concat({
        id: this.state.menuItems.length,
        name: this.state.addingItemName,
        handleDeleteClick: this.handleMenuDeleteClick,
        categoryItems: [],
      });

      return {
        menuItems: items,
      };
    });
  };

  handleMenuDeleteClick = (id: number) => {
    const array = this.state.menuItems;

    let newArray = array.filter(function logic(element) {
      return element.id !== id;
    });
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].id = i;
    }

    this.setState(() => {
      return {
        selectedItemIndex: -1,
        selectedCategoryIndex: -1,
        selectedMenuIndex: -1,
        menuItems: newArray,
      };
    });
    console.log(
      this.state.selectedItemIndex,
      " ",
      this.state.selectedCategoryIndex,
      " ",
      this.state.selectedMenuIndex
    );
  };

  handleMenuRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleMenuAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  updateText = (e: any) => {
    this.setState(() => {
      return {
        addingItemName: e.target.value,
      };
    });
  };

  validateText = (): string => {
    const emptyTextfieldErrorMsg: string = "Name field cannot be empty.";
    return this.state.addingItemName === "" ? emptyTextfieldErrorMsg : "";
  };

  setSelectedMenuIndex = (index: number): any => {
    this.setState(() => {
      return {
        selectedMenuIndex: index,
      };
    });
  };

  setSelectedCategoryIndex = (index: number): any => {
    this.setState(() => {
      return {
        selectedCategoryIndex: index,
      };
    });
  };

  setSelectedItemIndex = (index: number): any => {
    this.setState(() => {
      return {
        selectedItemIndex: index,
      };
    });
  };

  handleCategoryAddClick = () => {
    this.setState(() => {
      const items = this.state.menuItems[
        this.state.selectedMenuIndex
      ].categoryItems.concat({
        id: this.state.menuItems[this.state.selectedMenuIndex].categoryItems
          .length,
        name: this.state.addingItemName,
        handleDeleteClick: this.handleCategoryDeleteClick,
        items: [],
      });

      const updatingMenuItems = this.state.menuItems;
      updatingMenuItems[this.state.selectedMenuIndex].categoryItems = items;

      return {
        menuItems: updatingMenuItems,
      };
    });
  };
  handleCategoryDeleteClick = (id: number) => {
    const array =
      this.state.menuItems[this.state.selectedMenuIndex].categoryItems;

    let newArray = array.filter(function logic(element) {
      console.log(element.id, "---", id);
      return element.id !== id;
    });
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].id = i;
    }

    const updatingMenuItems = this.state.menuItems;
    updatingMenuItems[this.state.selectedMenuIndex].categoryItems = newArray;

    this.setState(() => {
      return {
        menuItems: updatingMenuItems,
      };
    });
  };

  handleCategoryRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleCategoryAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  handleItemAddClick = () => {
    this.setState(() => {
      const items = this.state.menuItems[
        this.state.selectedMenuIndex
      ].categoryItems[this.state.selectedCategoryIndex].items.concat({
        id: this.state.menuItems[this.state.selectedMenuIndex].categoryItems[
          this.state.selectedCategoryIndex
        ].items.length,
        name: this.state.addingItemName,
        handleDeleteClick: this.handleItemDeleteClick,
      });

      const updatingMenuItems = this.state.menuItems;
      updatingMenuItems[this.state.selectedMenuIndex].categoryItems[
        this.state.selectedCategoryIndex
      ].items = items;

      return {
        menuItems: updatingMenuItems,
      };
    });
  };
  handleItemDeleteClick = (id: number) => {
    const array =
      this.state.menuItems[this.state.selectedMenuIndex].categoryItems[
        this.state.selectedCategoryIndex
      ].items;

    let newArray = array.filter(function logic(element) {
      console.log(element.id, "---", id);
      return element.id !== id;
    });
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].id = i;
    }

    const updatingMenuItems = this.state.menuItems;
    updatingMenuItems[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].items = newArray;

    this.setState(() => {
      return {
        menuItems: updatingMenuItems,
      };
    });
  };
  handleItemRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleItemAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  render() {
    return (
      <>
        <Grid container spacing={0} bgcolor={"#ffebee"}>
          <Grid item xs={3}>
            <List component="nav">
              <Grid item xs={12}>
                <ColumnListItemButton
                  deleteDialogTitle="Are you sure you want to delete the menu?"
                  deleteDialogLabel="All items in the menu will be deleted as well."
                  items={this.state.menuItems}
                  handleDeleteClick={this.handleMenuDeleteClick}
                  setSelectedColumnIndex={this.setSelectedMenuIndex}
                />
              </Grid>
              <Grid item xs={12}>
                <ListItem disablePadding alignItems="center">
                  <AddButtonWithDialog
                    title="Enter Menu Name"
                    label="Menu Name"
                    handleRetrieveText={this.handleMenuRetrieveText}
                    updateText={this.updateText}
                    validateText={this.validateText}
                  />
                </ListItem>
              </Grid>
            </List>
          </Grid>

          {this.validateMenuIndexBeforeRender() !== -1 && (
            <Grid item xs={3}>
              <CategoryColumnList
                categoryItems={
                  this.state.menuItems[this.state.selectedMenuIndex]
                    .categoryItems
                }
                handleCategoryRetrieveText={this.handleCategoryRetrieveText}
                handleCategoryDeleteClick={this.handleCategoryDeleteClick}
                updateText={this.updateText}
                validateText={this.validateText}
                setSelectedCategoryIndex={this.setSelectedCategoryIndex}
              />
            </Grid>
          )}

          {this.validateCategoryIndexBeforeRender() !== -1 && (
            <Grid item xs={3}>
              <ItemColumnList
                itemItems={
                  this.state.menuItems[this.state.selectedMenuIndex]
                    .categoryItems[this.state.selectedCategoryIndex].items
                }
                handleItemRetrieveText={this.handleItemRetrieveText}
                handleItemDeleteClick={this.handleItemDeleteClick}
                updateText={this.updateText}
                validateText={this.validateText}
                setSelectedItemIndex={this.setSelectedItemIndex}
              />
            </Grid>
          )}

          {this.validateItemIndexBeforeRender() !== -1 && (
            <Grid item xs={3}>
              <ItemColumnPage />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}
