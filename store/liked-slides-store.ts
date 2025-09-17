import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getLikedSlides,
  saveLikedSlide,
  removeLikedSlide,
  isSlideliked,
} from "@/lib/storage";
import type { ReelSlide } from "@/lib/quotes";

interface LikedSlidesState {
  likedSlides: ReelSlide[];
  isLoading: boolean;
  addLikedSlide: (slide: ReelSlide) => void;
  removeLikedSlideById: (slideId: string) => void;
  isLiked: (slideId: string) => boolean;
  toggleLike: (slide: ReelSlide) => void;
  initializeStore: () => void;
}

export const useLikedSlidesStore = create<LikedSlidesState>()(
  persist(
    (set, get) => ({
      likedSlides: [],
      isLoading: true,

      initializeStore: () => {
        try {
          const slides = getLikedSlides();
          set({ likedSlides: slides, isLoading: false });
        } catch (error) {
          console.error("Error loading liked slides:", error);
          set({ isLoading: false });
        }
      },

      addLikedSlide: (slide: ReelSlide) => {
        try {
          saveLikedSlide(slide);
          set((state) => {
            const exists = state.likedSlides.some((s) => s.id === slide.id);
            if (exists) return state;
            return {
              likedSlides: [...state.likedSlides, { ...slide, isLiked: true }],
            };
          });
        } catch (error) {
          console.error("Error adding liked slide:", error);
        }
      },

      removeLikedSlideById: (slideId: string) => {
        try {
          removeLikedSlide(slideId);
          set((state) => ({
            likedSlides: state.likedSlides.filter((s) => s.id !== slideId),
          }));
        } catch (error) {
          console.error("Error removing liked slide:", error);
        }
      },

      isLiked: (slideId: string) => {
        return isSlideliked(slideId);
      },

      toggleLike: (slide: ReelSlide) => {
        const { isLiked, addLikedSlide, removeLikedSlideById } = get();
        if (isLiked(slide.id)) {
          removeLikedSlideById(slide.id);
        } else {
          addLikedSlide(slide);
        }
      },
    }),
    {
      name: "liked-slides-storage",
      partialize: (state) => ({ likedSlides: state.likedSlides }),
    }
  )
);
