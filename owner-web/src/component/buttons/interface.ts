import { GeneralProps, MenuProps } from "../edit_page_components/interface";

export interface AddButtonWithDialogProps {
  title: string;
  label: string;
  handleAddRetrieveText(e: any): any;
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
  editDialogTitle: string;
  editDialogLabel: string;
  items: GeneralProps[];
  handleDeleteClick(id: number): any;
  handleEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
  setSelectedColumnIndex(index?: number): any;
}

export interface EditButtonWithDialogProps {
  title: string;
  label: string;
  textValue: string;
  handleEditRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
}

export interface PublishButtonProps {
  isPublished: boolean;
  onPublishClick(): any;
}

export interface AccessQRButtonProps {
  isPublished: boolean;
  onQRClick(): any;
}
