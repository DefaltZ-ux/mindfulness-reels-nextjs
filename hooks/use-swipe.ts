"use client"

import { useState, useEffect, useCallback } from "react"

interface SwipeHandlers {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

interface SwipeConfig {
  threshold?: number
  preventDefaultTouchmoveEvent?: boolean
  trackMouse?: boolean
}

export function useSwipe(handlers: SwipeHandlers, config: SwipeConfig = {}) {
  const { threshold = 50, preventDefaultTouchmoveEvent = true, trackMouse = false } = config

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault()
      }
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      })
    },
    [preventDefaultTouchmoveEvent],
  )

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    // Prioritize vertical swipes for reels navigation
    if (Math.abs(distanceY) > Math.abs(distanceX)) {
      if (isUpSwipe && handlers.onSwipeUp) {
        handlers.onSwipeUp()
      }
      if (isDownSwipe && handlers.onSwipeDown) {
        handlers.onSwipeDown()
      }
    } else {
      if (isLeftSwipe && handlers.onSwipeLeft) {
        handlers.onSwipeLeft()
      }
      if (isRightSwipe && handlers.onSwipeRight) {
        handlers.onSwipeRight()
      }
    }
  }, [touchStart, touchEnd, threshold, handlers])

  // Mouse events for desktop testing
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!trackMouse) return
      setTouchEnd(null)
      setTouchStart({
        x: e.clientX,
        y: e.clientY,
      })
    },
    [trackMouse],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!trackMouse || !touchStart) return
      setTouchEnd({
        x: e.clientX,
        y: e.clientY,
      })
    },
    [trackMouse, touchStart],
  )

  const handleMouseUp = useCallback(() => {
    if (!trackMouse) return
    handleTouchEnd()
  }, [trackMouse, handleTouchEnd])

  useEffect(() => {
    const element = document.body

    // Touch events
    element.addEventListener("touchstart", handleTouchStart, { passive: false })
    element.addEventListener("touchmove", handleTouchMove, { passive: false })
    element.addEventListener("touchend", handleTouchEnd)

    // Mouse events for desktop
    if (trackMouse) {
      element.addEventListener("mousedown", handleMouseDown)
      element.addEventListener("mousemove", handleMouseMove)
      element.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)

      if (trackMouse) {
        element.removeEventListener("mousedown", handleMouseDown)
        element.removeEventListener("mousemove", handleMouseMove)
        element.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp, trackMouse])

  return {
    touchStart,
    touchEnd,
  }
}
