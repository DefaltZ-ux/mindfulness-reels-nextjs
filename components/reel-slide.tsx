"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import type { ReelSlide } from "@/lib/quotes"
import { isSlideliked } from "@/lib/storage"

interface ReelSlideProps {
  slide: ReelSlide
  onLike?: (slide: ReelSlide) => void
  onUnlike?: (slideId: string) => void
  showLikeButton?: boolean
}

export function ReelSlideComponent({ slide, onLike, onUnlike, showLikeButton = true }: ReelSlideProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const [lastTap, setLastTap] = useState(0)

  useEffect(() => {
    setIsLiked(isSlideliked(slide.id))
  }, [slide.id])

  const handleDoubleTap = (e: React.MouseEvent) => {
    const now = Date.now()
    const timeDiff = now - lastTap

    if (timeDiff < 300 && timeDiff > 0) {
      // Double tap detected
      e.preventDefault()
      if (!isLiked) {
        setIsLiked(true)
        onLike?.(slide)
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 1000)
      }
    }

    setLastTap(now)
  }

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLiked) {
      setIsLiked(false)
      onUnlike?.(slide.id)
    } else {
      setIsLiked(true)
      onLike?.(slide)
      // Show animation for manual like too
      setShowHeartAnimation(true)
      setTimeout(() => setShowHeartAnimation(false), 800)
    }
  }

  return (
    <div
      className="relative h-dvh w-full flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: slide.backgroundColor }}
      onClick={handleDoubleTap}
    >
      {/* Quote Text */}
      <div className="px-8 py-12 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white text-balance"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            fontFamily: "Georgia, serif",
          }}
        >
          {slide.text}
        </motion.p>
      </div>

      {/* Like Button */}
      {showLikeButton && (
        <motion.button
          className="absolute bottom-8 right-8 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
          onClick={handleLikeToggle}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white hover:text-red-200"
            }`}
          />
        </motion.button>
      )}

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeartAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1.2, 1.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heart className="w-24 h-24 fill-red-500 text-red-500 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Indicators */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <p className="text-xs font-medium rotate-90 whitespace-nowrap">Swipe</p>
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Double-tap hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-sm text-center">
        <p>Double-tap to like</p>
      </div>
    </div>
  )
}
