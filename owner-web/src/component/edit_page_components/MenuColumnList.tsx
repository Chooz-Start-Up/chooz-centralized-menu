import * as React from "react";
import { Box, Fade, Grid, List, ListItem, Typography } from "@mui/material/";
import {
  CategoryProps,
  ItemProps,
  MenuColumnListProps,
  MenuColumnListState,
  MenuProps,
} from "./interface";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import { CategoryColumnList } from "./CategoryColumnList";
import { ItemColumnList } from "./ItemColumnList";
import ItemColumnDisplay from "./ItemColumnDisplay";
import {
  pullRestaurantByUser,
  pullRestaurantMenuByUser,
  pushMenu,
} from "../../firebase/databaseAPI/RestaurantApi";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import { Restaurant } from "../../firebase/databaseAPI/Restaurant";
import { Menu } from "../../firebase/databaseAPI/Menu";
import {
  DragDropContext,
  Droppable,
  DraggableLocation,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { choozTheme } from "../../theme/theme";

export class MenuColumnList extends React.Component<
  MenuColumnListProps,
  MenuColumnListState
> {
  constructor(props: MenuColumnListProps) {
    super(props);

    this.state = {
      loading: false,
      reorderLoading: false,
      key: "",
      //
      addingItemName: "",
      menuItems: [],
      selectedMenuIndex: 0,
      selectedCategoryIndex: 0,
      selectedItemIndex: 0,
    };
  }

  pushMenuToDatabase(edittedMenus: MenuProps[]) {
    if (auth !== null && auth.currentUser !== null) {
      let menus = new Restaurant(this.state.key);
      menus.setMenuWithMenuProps(edittedMenus);
      pushMenu(auth.currentUser.uid, menus);
    }
  }

  componentDidMount() {
    this.setState(() => {
      return { loading: true };
    });

    if (auth !== null && auth.currentUser !== null) {
      pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
        this.setState(() => {
          return {
            key: restaurant.id,
          };
        });
      });
      pullRestaurantMenuByUser(auth.currentUser.uid).then(
        (menus) => {
          this.setState(() => {
            return {
              menuItems: this.convertMenuToMenuProps(menus),
            };
          });
        },
        (msg) => {
          console.error(msg);
        }
      );

      this.setState(() => {
        return { loading: false };
      });
    }
  }

  componentDidUpdate(
    prevProps: MenuColumnListProps,
    prevState: MenuColumnListState
  ) {
    if (this.state.reorderLoading !== prevState.reorderLoading) {
      if (auth !== null && auth.currentUser !== null) {
        pullRestaurantMenuByUser(auth.currentUser.uid).then(
          (menus) => {
            this.setState(
              () => {
                return {
                  menuItems: this.convertMenuToMenuProps(menus),
                };
              },
              () => {
                setTimeout(() => {
                  this.setState(() => {
                    return {
                      reorderLoading: false,
                    };
                  });
                }, 50);
              }
            );
          },
          (msg) => {
            console.error(msg);
          }
        );
      }
    }
  }

  convertMenuToMenuProps(menus: Menu[]) {
    let parsedMenuProps: MenuProps[] = [];
    menus.forEach((menu, menuIndex) => {
      let categoryItems: CategoryProps[] = [];
      menu.categories.forEach((cateogry, cateogryIndex) => {
        let items: ItemProps[] = [];
        cateogry.items.forEach((item, itemIndex) => {
          items = items.concat({
            id: itemIndex,
            name: item.itemName,
            handleDeleteClick: this.handleItemDeleteClick,
            description: item.description,
            price: +item.price,
            ingredients: item.ingredients,
          });
        });

        categoryItems = categoryItems.concat({
          id: cateogryIndex,
          name: cateogry.categoryName,
          handleDeleteClick: this.handleCategoryDeleteClick,
          items: items,
        });
      });

      parsedMenuProps = parsedMenuProps.concat({
        id: menuIndex,
        name: menu.menuName,
        handleDeleteClick: this.handleMenuDeleteClick,
        categoryItems: categoryItems,
      });
    });

    return parsedMenuProps;
  }

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
        // console.log("Updating index to ", index);
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
        // console.log("From local setSelectedCategoryIndex");
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
        // console.log("From local setSelectedItemIndex");
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
    // console.log("Text in textfield: ", e.target.value);
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
    const items = this.state.menuItems.concat({
      id: this.state.menuItems.length,
      name: this.state.addingItemName,
      handleDeleteClick: this.handleMenuDeleteClick,
      categoryItems: [],
    });

    this.setState(() => {
      return {
        menuItems: items,
      };
    });

    this.pushMenuToDatabase(items);
  };
  handleMenuAddRetrieveText = (e: any) => {
    e.preventDefault();
    // console.log(this.state.addingItemName);
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

    this.pushMenuToDatabase(newArray);
  };
  handleMenuEditClick = () => {
    const items = this.state.menuItems;
    items[this.state.selectedMenuIndex].name = this.state.addingItemName;

    this.setState(() => {
      return {
        menuItems: items,
      };
    });

    this.pushMenuToDatabase(items);
  };
  handleMenuEditRetrieveText = (e: any) => {
    e.preventDefault();
    // console.log(this.state.addingItemName);
    this.handleMenuEditClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  // Category-specific helper methods and button event handlers
  handleCategoryAddClick = () => {
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

    this.setState(() => {
      return {
        menuItems: updatingMenuItems,
      };
    });

    this.pushMenuToDatabase(updatingMenuItems);
  };
  handleCategoryAddRetrieveText = (e: any) => {
    e.preventDefault();
    // console.log(this.state.addingItemName);
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
      // console.log(element.id, "---", id);
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

    this.pushMenuToDatabase(updatingMenuItems);
  };
  handleCategoryEditClick = () => {
    const items = this.state.menuItems;

    items[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].name = this.state.addingItemName;

    this.setState(() => {
      return {
        menuItems: items,
      };
    });

    this.pushMenuToDatabase(items);
  };
  handleCategoryEditRetrieveText = (e: any) => {
    e.preventDefault();
    // console.log(this.state.addingItemName);
    this.handleCategoryEditClick();
    this.setState(() => {
      return {
        addingItemName: "",
      };
    });
  };

  // Item-specific helper methods and button event handlers
  handleItemAddClick = () => {
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

    this.setState(() => {
      return {
        menuItems: updatingMenuItems,
      };
    });

    this.pushMenuToDatabase(updatingMenuItems);
  };
  handleItemAddRetrieveText = (e: any) => {
    e.preventDefault();
    // console.log(this.state.addingItemName);
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
      // console.log(element.id, "---", id);
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

    this.pushMenuToDatabase(updatingMenuItems);
  };
  handleItemEditClick = () => {
    const items = this.state.menuItems;

    items[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].items[this.state.selectedItemIndex].name = this.state.addingItemName;

    this.setState(() => {
      return {
        menuItems: items,
      };
    });

    this.pushMenuToDatabase(items);
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
    let newArray = this.state.menuItems;
    newArray[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].items[this.state.selectedItemIndex] = item;

    this.setState(() => {
      return { menuItems: newArray };
    });

    this.pushMenuToDatabase(newArray);
  };

  onMenuDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const destinationIndex = result.destination.index;

    const array = Array.from(this.state.menuItems);
    const [removed] = array.splice(result.source.index, 1);
    array.splice(destinationIndex, 0, removed);

    this.pushMenuToDatabase(array);

    this.setState(
      () => {
        return {
          reorderLoading: true,
        };
      },
      () => {
        this.setSelectedMenuIndex(destinationIndex);
        this.setSelectedCategoryIndex(0);
        this.setSelectedItemIndex(0);
      }
    );
  };

  onCategoryDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const destinationIndex = result.destination.index;

    const array = Array.from(this.state.menuItems);
    const [removed] = array[this.state.selectedMenuIndex].categoryItems.splice(
      result.source.index,
      1
    );
    array[this.state.selectedMenuIndex].categoryItems.splice(
      result.destination.index,
      0,
      removed
    );

    this.pushMenuToDatabase(array);

    this.setState(() => {
      return {
        menuItems: array,
      };
    });

    this.setState(
      () => {
        return {
          reorderLoading: true,
        };
      },
      () => {
        this.setSelectedCategoryIndex(destinationIndex);
        this.setSelectedItemIndex(0);
      }
    );
  };

  onItemDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const destinationIndex = result.destination.index;

    const array = Array.from(this.state.menuItems);
    const [removed] = array[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].items.splice(result.source.index, 1);
    array[this.state.selectedMenuIndex].categoryItems[
      this.state.selectedCategoryIndex
    ].items.splice(result.destination.index, 0, removed);

    this.pushMenuToDatabase(array);

    this.setState(() => {
      return {
        menuItems: array,
      };
    });

    this.setState(
      () => {
        return {
          reorderLoading: true,
        };
      },
      () => {
        this.setSelectedItemIndex(destinationIndex);
      }
    );
  };

  render() {
    return (
      <>
        {!this.state.loading && (
          <Grid
            container
            spacing={0}
            height="90vh"
            sx={{ borderLeft: 1, borderColor: "grey.400" }}
          >
            <Grid
              item
              xs={2}
              borderRight={1}
              borderColor="grey.300"
              height="auto"
              minHeight={460}
            >
              <Box maxHeight={25}>
                <Typography
                  align="center"
                  bgcolor={choozTheme.palette.primary.light}
                  color={choozTheme.palette.primary.contrastText}
                  variant="h5"
                >
                  Menu
                </Typography>
              </Box>

              {!this.state.reorderLoading && (
                <DragDropContext onDragEnd={this.onMenuDragEnd}>
                  <Droppable
                    droppableId="droppableMenuList"
                    isDropDisabled={this.props.isPublished}
                  >
                    {(provided) => (
                      <Fade
                        in={!this.state.reorderLoading}
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
                              deleteDialogTitle="Are you sure you want to delete the menu?"
                              deleteDialogLabel="All items in the menu will be deleted as well."
                              editDialogTitle="Enter New Menu Name"
                              editDialogLabel="New Menu Name"
                              items={this.state.menuItems}
                              isPublished={this.props.isPublished}
                              handleDeleteClick={this.handleMenuDeleteClick}
                              handleEditRetrieveText={
                                this.handleMenuEditRetrieveText
                              }
                              updateText={this.updateText}
                              validateText={this.validateText}
                              setSelectedColumnIndex={this.setSelectedMenuIndex}
                            />
                          </Grid>
                          {!this.props.isPublished && (
                            <Grid item xs={12}>
                              <ListItem disablePadding alignItems="center">
                                <AddButtonWithDialog
                                  title="Enter Menu Name"
                                  label="Menu Name"
                                  handleAddRetrieveText={
                                    this.handleMenuAddRetrieveText
                                  }
                                  updateText={this.updateText}
                                  validateText={this.validateText}
                                />
                              </ListItem>
                            </Grid>
                          )}
                        </List>
                      </Fade>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </Grid>

            <Grid
              item
              xs={2}
              borderRight={1}
              borderColor="grey.300"
              height="auto"
              minHeight={460}
            >
              <Box maxHeight={25}>
                <Typography
                  align="center"
                  bgcolor={choozTheme.palette.primary.light}
                  color={choozTheme.palette.primary.contrastText}
                  variant="h5"
                >
                  Category
                </Typography>
              </Box>
              {this.validateMenuIndexBeforeRender() !== -1 && (
                <>
                  {!this.state.reorderLoading && (
                    <CategoryColumnList
                      categoryItems={
                        this.state.menuItems[this.state.selectedMenuIndex]
                          .categoryItems
                      }
                      isPublished={this.props.isPublished}
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
                      onCategoryDragEnd={this.onCategoryDragEnd}
                    />
                  )}
                </>
              )}
            </Grid>

            <Grid
              item
              xs={2}
              borderRight={1}
              borderColor="grey.300"
              height="auto"
              minHeight={460}
            >
              <Box maxHeight={25}>
                <Typography
                  align="center"
                  bgcolor={choozTheme.palette.primary.light}
                  color={choozTheme.palette.primary.contrastText}
                  variant="h5"
                >
                  Item
                </Typography>
              </Box>
              {this.validateCategoryIndexBeforeRender() !== -1 && (
                <>
                  {!this.state.reorderLoading && (
                    <ItemColumnList
                      itemItems={
                        this.state.menuItems[this.state.selectedMenuIndex]
                          .categoryItems[this.state.selectedCategoryIndex].items
                      }
                      isPublished={this.props.isPublished}
                      handleItemAddRetrieveText={this.handleItemAddRetrieveText}
                      handleItemDeleteClick={this.handleItemDeleteClick}
                      handleItemEditRetrieveText={
                        this.handleItemEditRetrieveText
                      }
                      updateText={this.updateText}
                      validateText={this.validateText}
                      setSelectedItemIndex={this.setSelectedItemIndex}
                      onItemDragEnd={this.onItemDragEnd}
                    />
                  )}
                </>
              )}
            </Grid>

            <Grid item xs={6}>
              <Box maxHeight={25}>
                <Typography
                  align="center"
                  bgcolor={choozTheme.palette.primary.light}
                  color={choozTheme.palette.primary.contrastText}
                  variant="h5"
                >
                  Item Detail
                </Typography>
              </Box>
              {this.validateItemIndexBeforeRender() !== -1 && (
                <Box width="95%" marginLeft={2} marginTop={2}>
                  <ItemColumnDisplay
                    item={
                      this.state.menuItems[this.state.selectedMenuIndex]
                        .categoryItems[this.state.selectedCategoryIndex].items[
                        this.state.selectedItemIndex
                      ]
                    }
                    isPublished={this.props.isPublished}
                    checkItemUpdate={this.checkItemUpdate}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}