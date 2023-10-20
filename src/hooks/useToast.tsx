import { toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ToastHookOptions {
  autoClose?: number;
  type?: "info" | "success" | "warning" | "error";
}

export const useToast = () => {
  const showToast = (message: string, options?: ToastHookOptions) => {
    const toastOptions: ToastOptions = {
      autoClose: options?.autoClose || 3000,
      type: options?.type || "info",
      position: toast.POSITION.BOTTOM_RIGHT,
    };

    toast(message, toastOptions);
  };

  return { showToast };
};
