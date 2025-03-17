// app/context/DarkModeContext.js
"use client";
import { createContext, useState, useEffect, useContext } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from user preference or localStorage
  useEffect(() => {
    // Check localStorage or system preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(savedDarkMode ?? prefersDark);
  }, []);

  // Update localStorage and apply class to body when dark mode changes
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
