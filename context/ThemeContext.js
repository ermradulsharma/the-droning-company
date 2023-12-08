import React, { createContext, useState } from 'react';

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeContextProvider = ({ children }) => {
  const currentThemeMode = localStorage.getItem("theme-mode") === "dark" ? 'dark' : 'light';
  const [ themeMode, setThemeMode] = useState(currentThemeMode);

  const setMode = (data) => {
      localStorage.setItem("theme-mode", data);
      setThemeMode(data);
  }

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode: setMode }}>
        {children}
    </ThemeContext.Provider>
  )
}