import { useContext } from "react";
import CommonFunctionContext from "../context/CommonFunctionContext";

export default function useCommonFunctionContext() {
  return useContext(CommonFunctionContext);
}
