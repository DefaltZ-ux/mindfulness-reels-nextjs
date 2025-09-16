"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ReelSlideComponent } from "./reel-slide";
import { LikedReelSlideComponent } from "./liked-reel-slide";
import {
  inspirationalQuotes,
  mindfulColors,
  type ReelSlide,
} from "@/lib/quotes";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";
import Link from "next/link";
import { useSwipe } from "@/hooks/use-swipe";
import { useLikedSlides } from "@/hooks/use-liked-slides";

interface ReelsContainerProps {
  initialSlides?: ReelSlide[];
  showNavigation?: boolean;
  isLikedPage?: boolean;
}

export function ReelsContainer({
  initialSlides,
  showNavigation = true,
  isLikedPage = false,
}: ReelsContainerProps) {
  const [slides, setSlides] = useState<ReelSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { addLikedSlide, removeLikedSlideById, likedSlides } = useLikedSlides();

  // Generate random slides
  const generateSlide = useCallback((): ReelSlide => {
    const randomQuote =
      inspirationalQuotes[
        Math.floor(Math.random() * inspirationalQuotes.length)
      ];
    const randomColor =
      mindfulColors[Math.floor(Math.random() * mindfulColors.length)];

    return {
      id: `slide-${Date.now()}-${Math.random()}`,
      text: randomQuote,
      backgroundColor: randomColor,
      isLiked: false,
      timestamp: Date.now(),
    };
  }, []);

  // Initialize slides
  useEffect(() => {
    if (initialSlides && initialSlides.length > 0) {
      setSlides(initialSlides);
    } else {
      // Generate initial set of slides
      const initialSet = Array.from({ length: 5 }, () => generateSlide());
      setSlides(initialSet);
    }
  }, [initialSlides, generateSlide]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;

      // Generate more slides if we're near the end (only for main page)
      if (nextIndex >= slides.length - 2 && !initialSlides) {
        setSlides((prevSlides) => [
          ...prevSlides,
          ...Array.from({ length: 3 }, () => generateSlide()),
        ]);
      }

      return Math.min(nextIndex, slides.length - 1);
    });
  }, [slides.length, generateSlide, initialSlides]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useSwipe(
    {
      onSwipeUp: goToNext,
      onSwipeDown: goToPrevious,
    },
    {
      threshold: 50,
      preventDefaultTouchmoveEvent: true,
      trackMouse: true,
    }
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const handleLike = useCallback(
    (slide: ReelSlide) => {
      addLikedSlide(slide);
    },
    [addLikedSlide]
  );

  const handleUnlike = useCallback(
    (slideId: string) => {
      removeLikedSlideById(slideId);
      // If we're on the liked page, remove the slide from current view
      if (isLikedPage) {
        setSlides((prev) => {
          const newSlides = prev.filter((s) => s.id !== slideId);
          // Adjust current index if necessary
          if (currentIndex >= newSlides.length && newSlides.length > 0) {
            setCurrentIndex(newSlides.length - 1);
          }
          return newSlides;
        });
      }
    },
    [removeLikedSlideById, isLikedPage, currentIndex]
  );

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  if (slides.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-primary">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-lg">Loading mindful moments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Navigation */}
      {showNavigation && (
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/liked">
            <Button
              variant="ghost"
              size="sm"
              className="text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 relative"
            >
              <Heart className="w-4 h-4 mr-2" />
              Liked
              {likedSlides.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {likedSlides.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      )}

      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          {isLikedPage ? (
            <LikedReelSlideComponent
              slide={slides[currentIndex]}
              onUnlike={handleUnlike}
            />
          ) : (
            <ReelSlideComponent
              slide={slides[currentIndex]}
              onLike={handleLike}
              onUnlike={handleUnlike}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls (for testing) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-50 opacity-50 hover:opacity-100 transition-opacity">
        <Button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          variant="ghost"
          size="sm"
          className="text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 disabled:opacity-30 text-xs px-2 py-1"
        >
          ↑
        </Button>
        <Button
          onClick={goToNext}
          disabled={currentIndex >= slides.length - 1 && !!initialSlides}
          variant="ghost"
          size="sm"
          className="text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 disabled:opacity-30 text-xs px-2 py-1"
        >
          ↓
        </Button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-4 text-white/80 text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
}
