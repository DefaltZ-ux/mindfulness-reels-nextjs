import type { ReelSlide } from "./quotes"

const LIKED_SLIDES_KEY = "mindful-reels-liked"

export const getLikedSlides = (): ReelSlide[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(LIKED_SLIDES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading liked slides:", error)
    return []
  }
}

export const saveLikedSlide = (slide: ReelSlide): void => {
  if (typeof window === "undefined") return

  try {
    const likedSlides = getLikedSlides()
    const existingIndex = likedSlides.findIndex((s) => s.id === slide.id)

    if (existingIndex === -1) {
      likedSlides.push({ ...slide, isLiked: true })
      localStorage.setItem(LIKED_SLIDES_KEY, JSON.stringify(likedSlides))
    }
  } catch (error) {
    console.error("Error saving liked slide:", error)
  }
}

export const removeLikedSlide = (slideId: string): void => {
  if (typeof window === "undefined") return

  try {
    const likedSlides = getLikedSlides()
    const filtered = likedSlides.filter((s) => s.id !== slideId)
    localStorage.setItem(LIKED_SLIDES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error("Error removing liked slide:", error)
  }
}

export const isSlideliked = (slideId: string): boolean => {
  const likedSlides = getLikedSlides()
  return likedSlides.some((s) => s.id === slideId)
}
