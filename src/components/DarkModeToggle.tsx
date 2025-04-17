import { useState, useEffect } from "react";
import { SunIcon } from "../assets/icons/SunIcon";
import { MoonIcon } from "../assets/icons/MoonIcon";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // On component mount, check if user has a preference
  useEffect(() => {
    // Check if user has a preference in localStorage
    const savedPreference = localStorage.getItem("darkMode");
    
    // If they have a preference, use it
    if (savedPreference !== null) {
      setDarkMode(savedPreference === "true");
    } 
    // Otherwise check system preference
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Update the document when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('color-scheme', 'dark');
      document.documentElement.style.setProperty('--bg-primary', 'var(--color-dark-bg-primary)');
      document.documentElement.style.setProperty('--bg-secondary', 'var(--color-dark-bg-secondary)');
      document.documentElement.style.setProperty('--text-primary', 'var(--color-dark-text-primary)');
      document.documentElement.style.setProperty('--text-secondary', 'var(--color-dark-text-secondary)');
      document.documentElement.style.setProperty('--border-color', 'var(--color-dark-border)');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('color-scheme', 'light');
      document.documentElement.style.setProperty('--bg-primary', 'white');
      document.documentElement.style.setProperty('--bg-secondary', 'oklch(0.97 0.01 240)');
      document.documentElement.style.setProperty('--text-primary', 'oklch(0.2 0.01 240)');
      document.documentElement.style.setProperty('--text-secondary', 'oklch(0.4 0.01 240)');
      document.documentElement.style.setProperty('--border-color', 'oklch(0.85 0.01 240)');
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-full bg-[--bg-secondary] text-[--text-primary] transition-colors"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}
