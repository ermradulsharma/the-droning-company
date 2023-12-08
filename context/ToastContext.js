import React, { useCallback, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export default ToastContext;

export const  ToastContextProvider =({ children }) => {

  const hideToast = useCallback(
      () => toast.dismiss()
  );

  const showToastSuccess = useCallback (
    (message) => toast.success(message, {
      position: "bottom-center",
      closeOnClick: true,
      hideProgressBar: true
    })
  );

  const showToastError = useCallback (
    (message) => toast.error(message, {
      position: "bottom-center",
      closeOnClick: true,
      hideProgressBar: true
    })
  );

  const showToastWarning = useCallback (
    (message) => toast.warn(message, {
      position: "bottom-center",
      closeOnClick: true,
      hideProgressBar: true
    })
  );

  const showToast = useCallback(
    (message) => toast(message, {
        position: "bottom-center",
        closeOnClick: true,
        hideProgressBar: true
    })
  );

  return (
    <ToastContext.Provider value={{showToast, showToastSuccess, showToastError, showToastWarning, hideToast}}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
