import { createContext, useContext } from "react";
import { useThemeFuction } from "../hooks/useTheme";

export const Theme = createContext();

export const getFunctionTheme = () => {
  const { handleTheme } = useContext(Theme);
  return handleTheme;
};
export const getTheme = () => {
  const { isDark } = useContext(Theme);
  return isDark;
};
export function ThemeProvider({ children }) {
  const { isDark, handleTheme } = useThemeFuction();
  return (
    <Theme.Provider value={{ isDark, handleTheme }}>{children}</Theme.Provider>
  );
}
