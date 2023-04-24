import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    closeOnClick: true,
    theme: "colored",
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    theme: "colored",
  });
};
