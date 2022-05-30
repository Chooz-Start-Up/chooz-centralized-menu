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
  handleCategoryRetrieveText(e: any): any;
  handleCategoryDeleteClick(id: number): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedCategoryIndex: any;
}

export interface ItemColumnListProps {
  itemItems: ItemProps[];
  handleItemRetrieveText(e: any): any;
  handleItemDeleteClick(id: number): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedItemIndex: any;
}

export interface ItemColumnPageProps {}
