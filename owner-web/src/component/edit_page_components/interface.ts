export interface GeneralProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
}

export interface CategoryProps {
  id: number;
  name: string;
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

export interface MenuColumnListProps {}

export interface MenuColumnListState {
  addingItemName: string;
  menuItems: MenuProps[];
  selectedMenuIndex: number;
  selectedCategoryIndex: number;
  selectedItemIndex: number;
}

export interface CategoryColumnListProps {
  categoryItems: CategoryProps[];
  handleCategoryAddRetrieveText(e: any): any;
  handleCategoryDeleteClick(id: number): any;
  handleCategoryEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedCategoryIndex(index: number): any;
}

export interface ItemColumnListProps {
  itemItems: ItemProps[];
  handleItemAddRetrieveText(e: any): any;
  handleItemDeleteClick(id: number): any;
  handleItemEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedItemIndex(index: number): any;
}

export interface ItemColumnPageProps {
  item: ItemProps;
  checkItemUpdate(item: ItemProps): any;
}

export interface ProfilePanelProps {}

export interface ProfilePanelState {
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
