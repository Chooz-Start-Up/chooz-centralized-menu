import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material/";
import {
  ItemProps,
  MenuColumnListProps,
  MenuColumnListState,
} from "./interface";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import { CategoryColumnList } from "./CategoryColumnList";
import { ItemColumnList } from "./ItemColumnList";
import ItemColumnPage from "./ItemColumnPage";

export class MenuColumnList extends React.Component<
  MenuColumnListProps,
  MenuColumnListState
> {
  constructor(props: MenuColumnListProps) {
    super(props);

    this.state = {
      addingItemName: "",
      menuItems: [],
      selectedMenuIndex: 0,
      selectedCategoryIndex: 0,
      selectedItemIndex: 0,
    };

    console.log("This is constuctor");
  }

  // static getDerivedStateFromProps(
  //   props: MenuColumnListProps,
  //   state: MenuColumnListState
  // ) {
  //   console.log("This is getDerivedStateFromProps");

  //   return state;
  // }

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

  handleRetrieveText = (e: any) => {
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

  setSelectedMenuIndex = (index?: number): any => {
    if (index !== undefined) {
      this.setState(() => {
        console.log("Updating index to ", index);
        return {
          selectedMenuIndex: index,
          selectedCategoryIndex: 0,
          selectedItemIndex: 0,
        };
      });
    } else {
      return this.state.selectedMenuIndex;
    }
  };

  setSelectedCategoryIndex = (index?: number): any => {
    if (index !== undefined) {
      this.setState(() => {
        console.log("From local setSelectedCategoryIndex");
        return {
          selectedCategoryIndex: index,
          selectedItemIndex: 0,
        };
      });
    } else {
      return this.state.selectedCategoryIndex;
    }
  };

  setSelectedItemIndex = (index: number): any => {
    if (index !== undefined) {
      this.setState(() => {
        console.log("From local setSelectedItemIndex");
        return {
          selectedItemIndex: index,
        };
      });
    } else {
      return this.state.selectedItemIndex;
    }
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
        description: "",
        price: 0,
        ingredients: "",
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

  checkItemUpdate = (item: ItemProps) => {
    this.setState(() => {
      let newArray = this.state.menuItems;
      newArray[this.state.selectedMenuIndex].categoryItems[
        this.state.selectedCategoryIndex
      ].items[this.state.selectedItemIndex] = item;
      return { menuItems: newArray };
    });
  };

  render() {
    console.log(
      this.state.selectedMenuIndex,
      " ",
      this.state.selectedCategoryIndex,
      " ",
      this.state.selectedItemIndex
    );
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
                    handleRetrieveText={this.handleRetrieveText}
                    updateText={this.updateText}
                    validateText={this.validateText}
                  />
                </ListItem>
              </Grid>
            </List>
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ height: "100vh" }}
          />
          {this.validateMenuIndexBeforeRender() !== -1 && (
            <>
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
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: "100vh" }}
              />
            </>
          )}

          {this.validateCategoryIndexBeforeRender() !== -1 && (
            <>
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
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: "100vh" }}
              />
            </>
          )}

          {this.validateItemIndexBeforeRender() !== -1 && (
            <Grid item xs={2.9}>
              <ItemColumnPage
                item={
                  this.state.menuItems[this.state.selectedMenuIndex]
                    .categoryItems[this.state.selectedCategoryIndex].items[
                    this.state.selectedItemIndex
                  ]
                }
                checkItemUpdate={this.checkItemUpdate}
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}
