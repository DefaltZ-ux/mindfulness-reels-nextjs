"use client"

import { useState, useEffect, useCallback } from "react"
import { getLikedSlides, saveLikedSlide, removeLikedSlide, isSlideliked } from "@/lib/storage"
import type { ReelSlide } from "@/lib/quotes"

export function useLikedSlides() {
  const [likedSlides, setLikedSlides] = useState<ReelSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load liked slides from localStorage
  useEffect(() => {
    const loadLikedSlides = () => {
      try {
        const slides = getLikedSlides()
        setLikedSlides(slides)
      } catch (error) {
        console.error("Error loading liked slides:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLikedSlides()
  }, [])

  const addLikedSlide = useCallback((slide: ReelSlide) => {
    try {
      saveLikedSlide(slide)
      setLikedSlides((prev) => {
        const exists = prev.some((s) => s.id === slide.id)
        if (exists) return prev
        return [...prev, { ...slide, isLiked: true }]
      })
    } catch (error) {
      console.error("Error adding liked slide:", error)
    }
  }, [])

  const removeLikedSlideById = useCallback((slideId: string) => {
    try {
      removeLikedSlide(slideId)
      setLikedSlides((prev) => prev.filter((s) => s.id !== slideId))
    } catch (error) {
      console.error("Error removing liked slide:", error)
    }
  }, [])

  const isLiked = useCallback((slideId: string) => {
    return isSlideliked(slideId)
  }, [])

  const toggleLike = useCallback(
    (slide: ReelSlide) => {
      if (isLiked(slide.id)) {
        removeLikedSlideById(slide.id)
      } else {
        addLikedSlide(slide)
      }
    },
    [isLiked, addLikedSlide, removeLikedSlideById],
  )

  return {
    likedSlides,
    isLoading,
    addLikedSlide,
    removeLikedSlideById,
    isLiked,
    toggleLike,
  }
}
