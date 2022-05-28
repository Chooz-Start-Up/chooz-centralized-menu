export interface CatergoryItemProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
}

export interface MenuItemProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
  categoryItems: CatergoryItemProps[];
}

export interface MenuColumnListProps {}

export interface MenuColumnListState {
  addingMenuName: string;
  menuItems: MenuItemProps[];
}
