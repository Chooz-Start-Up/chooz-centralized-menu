export interface DeleteButtonWithWarningDialogProps {
  id: number;
  deleteAction(id: number): any;
}

export interface AddButtonWithDialogProps {
  addingMenuName: string;
  handleRetrieveText(e: any): any;
  updateText(e: any): any;
  validateText(): any;
}
