export interface ConfirmModalOptions {
  title: string;
  text: string;
  icon?: string;
  prefix?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: Function;
  onCancel?: Function;
}
