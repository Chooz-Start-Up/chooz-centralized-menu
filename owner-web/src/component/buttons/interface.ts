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

export interface EditMenuButtonWithDialogProps {
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

export interface EditProfileButtonWithDialogProps {
  ownerNameUpdate(text?: string): any;
  restaurantNameUpdate(text?: string): any;
  descriptionUpdate(text?: string): any;
  addressUpdate(text?: string): any;
  hoursUpdate(text?: string): any;

  onSaveClick(): any;
  // ownerNameValidationText restaurantNameValidationText descriptionValidationText addressValidationText hoursValidationText
  ownerNameValidationText: string;
  restaurantNameValidationText: string;
  descriptionValidationText: string;
  addressValidationText: string;
}

export interface DateTimeInputProps {
  timeString: string;
  updateTimeString(timeString: string): any;
}

export interface DateTimeInputState {
  date: string;
  isClosed: boolean;
  startTime: string;
  closeTime: string;
}
