import { DropResult } from "react-beautiful-dnd";

export interface GeneralProps {
  id: number;
  name: string;
  description?: string;
  handleDeleteClick(id: number): any;
}

export interface CategoryProps {
  id: number;
  name: string;
  description: string;
  handleDeleteClick(id: number): any;
  items: ItemProps[];
}

export interface MenuProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
  categoryItems: CategoryProps[];
}

export interface ItemProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
  description: string;
  price: number;
  ingredients: string;
}

export interface MenuColumnListProps {
  isPublished: boolean;
}

export interface MenuColumnListState {
  loading: boolean;
  reorderLoading: boolean;
  key: string;
  //
  addingItemName: string;
  addingDescription: string;
  menuItems: MenuProps[];
  selectedMenuIndex: number;
  selectedCategoryIndex: number;
  selectedItemIndex: number;
}

export interface CategoryColumnListProps {
  categoryItems: CategoryProps[];
  isPublished: boolean;
  handleCategoryAddRetrieveText(e: any): any;
  handleCategoryDeleteClick(id: number): any;
  handleCategoryEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedCategoryIndex(index: number): any;
  onCategoryDragEnd(result: DropResult): any;
  updateDescriptionText(e: any): any;
}

export interface ItemColumnListProps {
  itemItems: ItemProps[];
  isPublished: boolean;
  handleItemAddRetrieveText(e: any): any;
  handleItemDeleteClick(id: number): any;
  handleItemEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedItemIndex(index: number): any;
  onItemDragEnd(result: DropResult): any;
}

export interface ItemColumnDisplayProps {
  menuIndex: number;
  categoryIndex: number;
  item: ItemProps;
  isPublished: boolean;
  categoryDescription: string;
  checkItemUpdate(item: ItemProps): any;
}

export interface ProfilePanelProps {}

export interface ProfilePanelState {
  loading: boolean;
  key: string;
  isPublished: boolean;
  //
  ownerName: string;
  restaurantName: string;
  description: string;
  address: string;
  phoneNumber: string;
  hours: string;
  //
  newOwnerName: string;
  newRestaurantName: string;
  newDescription: string;
  newAddress: string;
  newPhoneNumber: string;
  newHours: string;
  //
  ownerNameValidationText: string;
  restaurantNameValidationText: string;
  descriptionValidationText: string;
  addressValidationText: string;
  phoneNumberValidationText: string;
}
