import { GeneralProps } from "../edit_page_components/interface";

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
  isPublished: boolean;
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
  isProfileValid: boolean;
  isLoading: boolean;
  restaurantName: string;
  checkValidProfile(): any;
  onPublishClick(): any;
}

export interface AccessQRButtonProps {
  isPublished: boolean;
  restaurantName: string;
}

export interface EditProfileButtonWithDialogProps {
  ownerNameUpdate(text?: string): any;
  restaurantNameUpdate(text?: string): any;
  descriptionUpdate(text?: string): any;
  addressUpdate(text?: string): any;
  phoneNumberUpdate(text?: string): any;
  hoursUpdate(text?: string): any;

  onSaveClick(): any;

  ownerNameValidationText: string;
  restaurantNameValidationText: string;
  descriptionValidationText: string;
  addressValidationText: string;
  phoneNumberValidationText: string;
}

export interface DateTimeInputProps {
  timeString: string;
  updateTimeString(timeString: string): any;
  aboveTimeString: string;
}

export interface DateTimeInputState {
  date: string;
  isClosed: boolean;
  startTime: string;
  closeTime: string;
}

export interface UnpublishAndEditButtonWithDialogProps {
  isPublished: boolean;
  isLoading: boolean;
  onUnpublishEditClick(): any;
}

export interface UploadDeleteImageButtonWithDialogProps {
  handleUploadAgreeClick(): any;
  handleDeleteAgreeClick(): any;
}
