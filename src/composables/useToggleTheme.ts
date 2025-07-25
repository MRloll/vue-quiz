import { ref, onMounted, onUnmounted } from "vue";
export function useToggleTheme() {
  const isDarkMode = ref(false);

  const toggleDarkMode = (): void => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark", isDarkMode.value);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode.value));
  };

  const initializeDarkMode = (): void => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      isDarkMode.value = JSON.parse(savedDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    }
  };

  return {
    isDarkMode,
    toggleDarkMode,
    initializeDarkMode,
  };
}
