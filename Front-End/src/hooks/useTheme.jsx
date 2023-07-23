import { useEffect , useState} from "react";

export const useThemeFuction = () => {
  const [isDark, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (!localTheme) return true;
    return localTheme === "dark";
  });
  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    }
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  return {
    handleTheme: () => {
      setTheme((prev) => !prev);
    },
    isDark,
  };
};

