import { useState, useEffect } from "react";

/**
 * Custom hook to manage application's theme (light or dark).
 */
export default function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setIsDarkMode(theme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDarkMode, toggleTheme };
}
