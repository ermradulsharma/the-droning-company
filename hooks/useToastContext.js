import { useContext } from "react";
import ToastContext from "../context/ToastContext";

export default function useToastContext() {
  return useContext(ToastContext);
}
