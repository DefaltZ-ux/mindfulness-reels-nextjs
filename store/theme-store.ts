import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  themeType: "color" | "image";
  audioEnabled: boolean;
  setThemeType: (type: "color" | "image") => void;
  setAudioEnabled: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeType: "image",
      audioEnabled: false,

      setThemeType: (type: "color" | "image") => {
        set({ themeType: type });
      },

      setAudioEnabled: (enabled: boolean) => {
        set({ audioEnabled: enabled });
      },
    }),
    {
      name: "mindfulness-theme-storage",
      partialize: (state) => ({
        themeType: state.themeType,
        audioEnabled: state.audioEnabled,
      }),
    }
  )
);
