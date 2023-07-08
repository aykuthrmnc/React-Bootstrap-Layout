import { useCallback, useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (
      localStorage[import.meta.env.VITE_THEME_KEY] === "dark" ||
      (!(import.meta.env.VITE_THEME_KEY in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, []);

  const changeTheme = useCallback(() => {
    if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
      setTheme("light");
      localStorage.setItem(import.meta.env.VITE_THEME_KEY, "light");
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem(import.meta.env.VITE_THEME_KEY, "dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  }, []);

  return { theme, changeTheme };
};

export default useTheme;
