import { GeneralProps, MenuProps } from "../main_objects/interface";

export interface AddButtonWithDialogProps {
  title: string;
  label: string;
  handleRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
}

export interface DeleteButtonWithWarningDialogProps {
  title: string;
  label: string;
  id: number;
  deleteAction(id: number): any;
}

export interface ColumnListGeneralButtonProps {
  deleteDialogTitle: string;
  deleteDialogLabel: string;
  items: GeneralProps[];
  handleDeleteClick(id: number): any;
  setSelectedColumnIndex(index?: number): any;
}
