import { MenuItemProps } from "../main_objects/interface";

export interface AddButtonWithDialogProps {
  addingMenuName: string;
  handleRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
}

export interface DeleteButtonWithWarningDialogProps {
  id: number;
  deleteAction(id: number): any;
}

export interface MenuListItemButtonProps {
  // listLength: number;
  menuItems: MenuItemProps[];
  // id: number;
  // name: string;
  handleDeleteClick(id: number): any;
  setSelectedMenuIndex(index: number): any;
}
