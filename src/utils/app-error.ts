import { toast } from "react-toastify";

export const notifyError = (text: string) =>
  toast(text, {
    position: 'bottom-center',
    type: 'error',
});

export const notifySuccess = (text: string) =>
  toast(text, {
    position: 'bottom-center',
    type: 'success',
});
