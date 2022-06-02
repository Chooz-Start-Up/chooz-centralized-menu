import * as React from "react";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
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

  // Validator to hide or show columns
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

  // Column list selectors
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

  // Generic textfield updater
  updateText = (e: any) => {
    console.log("Text in textfield: ", e.target.value);
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

  // Menu-specific helper methods and button event handlers
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
  handleMenuAddRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleMenuAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
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
  handleMenuEditClick = () => {
    this.setState(() => {
      const items = this.state.menuItems;

      items[this.state.selectedMenuIndex].name = this.state.addingItemName;

      return {
        menuItems: items,
      };
    });
  };
  handleMenuEditRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleMenuEditClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  // Category-specific helper methods and button event handlers
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
  handleCategoryAddRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleCategoryAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
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
  handleCategoryEditClick = () => {
    this.setState(() => {
      const items = this.state.menuItems;

      items[this.state.selectedMenuIndex].categoryItems[
        this.state.selectedCategoryIndex
      ].name = this.state.addingItemName;

      return {
        menuItems: items,
      };
    });
  };
  handleCategoryEditRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleCategoryEditClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  // Item-specific helper methods and button event handlers
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
  handleItemAddRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleItemAddClick();
    this.setState(() => {
      return {
        addingItemName: "",
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
  handleItemEditClick = () => {
    this.setState(() => {
      const items = this.state.menuItems;

      items[this.state.selectedMenuIndex].categoryItems[
        this.state.selectedCategoryIndex
      ].items[this.state.selectedItemIndex].name = this.state.addingItemName;

      return {
        menuItems: items,
      };
    });
  };
  handleItemEditRetrieveText = (e: any) => {
    e.preventDefault();
    console.log(this.state.addingItemName);
    this.handleItemEditClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  // Item Page helper method to update fields real time
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
        <Grid container spacing={0} bgcolor={"white"}>
          <Grid
            item
            xs={2}
            borderRight={1}
            borderColor="grey.300"
            height="100vh"
            minHeight={460}
          >
            <Box maxHeight={25}>
              <Typography
                align="center"
                bgcolor="#f59795"
                color="white"
                variant="h5"
              >
                Menu
              </Typography>
            </Box>

            <List component="nav">
              <Grid item xs={12}>
                <ColumnListItemButton
                  deleteDialogTitle="Are you sure you want to delete the menu?"
                  deleteDialogLabel="All items in the menu will be deleted as well."
                  editDialogTitle="Enter New Menu Name"
                  editDialogLabel="New Menu Name"
                  items={this.state.menuItems}
                  handleDeleteClick={this.handleMenuDeleteClick}
                  handleEditRetrieveText={this.handleMenuEditRetrieveText}
                  updateText={this.updateText}
                  validateText={this.validateText}
                  setSelectedColumnIndex={this.setSelectedMenuIndex}
                />
              </Grid>
              <Grid item xs={12}>
                <ListItem disablePadding alignItems="center">
                  <AddButtonWithDialog
                    title="Enter Menu Name"
                    label="Menu Name"
                    handleAddRetrieveText={this.handleMenuAddRetrieveText}
                    updateText={this.updateText}
                    validateText={this.validateText}
                  />
                </ListItem>
              </Grid>
            </List>
          </Grid>

          <Grid
            item
            xs={2}
            borderRight={1}
            borderColor="grey.300"
            height="100vh"
            minHeight={460}
          >
            <Box maxHeight={25}>
              <Typography
                align="center"
                bgcolor="#f59795"
                color="white"
                variant="h5"
              >
                Category
              </Typography>
            </Box>
            {this.validateMenuIndexBeforeRender() !== -1 && (
              <>
                <CategoryColumnList
                  categoryItems={
                    this.state.menuItems[this.state.selectedMenuIndex]
                      .categoryItems
                  }
                  handleCategoryAddRetrieveText={
                    this.handleCategoryAddRetrieveText
                  }
                  handleCategoryDeleteClick={this.handleCategoryDeleteClick}
                  handleCategoryEditRetrieveText={
                    this.handleCategoryEditRetrieveText
                  }
                  updateText={this.updateText}
                  validateText={this.validateText}
                  setSelectedCategoryIndex={this.setSelectedCategoryIndex}
                />
              </>
            )}
          </Grid>

          <Grid
            item
            xs={2}
            borderRight={1}
            borderColor="grey.300"
            height="100vh"
            minHeight={460}
          >
            <Box maxHeight={25}>
              <Typography
                align="center"
                bgcolor="#f59795"
                color="white"
                variant="h5"
              >
                Item
              </Typography>
            </Box>
            {this.validateCategoryIndexBeforeRender() !== -1 && (
              <>
                <ItemColumnList
                  itemItems={
                    this.state.menuItems[this.state.selectedMenuIndex]
                      .categoryItems[this.state.selectedCategoryIndex].items
                  }
                  handleItemAddRetrieveText={this.handleItemAddRetrieveText}
                  handleItemDeleteClick={this.handleItemDeleteClick}
                  handleItemEditRetrieveText={this.handleItemEditRetrieveText}
                  updateText={this.updateText}
                  validateText={this.validateText}
                  setSelectedItemIndex={this.setSelectedItemIndex}
                />
              </>
            )}
          </Grid>

          <Grid item xs={6}>
            <Box maxHeight={25}>
              <Typography
                align="center"
                bgcolor="#f59795"
                color="white"
                variant="h5"
              >
                Item Detail
              </Typography>
            </Box>
            {this.validateItemIndexBeforeRender() !== -1 && (
              <Box width="95%" marginLeft={2} marginTop={2}>
                <ItemColumnPage
                  item={
                    this.state.menuItems[this.state.selectedMenuIndex]
                      .categoryItems[this.state.selectedCategoryIndex].items[
                      this.state.selectedItemIndex
                    ]
                  }
                  checkItemUpdate={this.checkItemUpdate}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}
