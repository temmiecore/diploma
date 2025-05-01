import React, { createContext, useContext, useState } from "react";
import { lightColors, darkColors } from "./colors";

const ThemeContext = createContext({
  theme: lightColors,
  darkMode: false,
  setDarkMode: (mode: boolean) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
