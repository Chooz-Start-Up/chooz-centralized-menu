import { Item } from "./Item";

export interface ColumnProps {
  title: string;
}

export interface ColumnState {
  items: ItemProps[];
}

export interface ItemProps {
  id: number;
  name: string;
  deleteButton(id: number): any;
}

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserDataAPI {
  data: UserData;
}
