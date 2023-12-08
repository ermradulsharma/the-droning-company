import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function useThemeContext() {
  return useContext(ThemeContext);
}
