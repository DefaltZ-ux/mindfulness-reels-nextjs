"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";

export interface ReelItem {
  id: string;
  type: "video" | "image" | "text" | "custom";
  content: string | React.ReactNode;
  videoUrl?: string;
  imageUrl?: string;
  text?: string;
  customComponent?: React.ReactNode;
}

interface ReelsViewerProps {
  items: ReelItem[];
  className?: string;
  onItemChange?: (currentIndex: number, item: ReelItem) => void;
}

export default function ReelsViewer({
  items,
  className = "",
  onItemChange,
}: ReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle infinite looping
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: any, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.y > threshold) {
        goToPrevious();
      } else if (info.offset.y < -threshold) {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowDown" || "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Handle mouse wheel
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        goToNext();
      } else if (event.deltaY < 0) {
        goToPrevious();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [goToNext, goToPrevious]);

  // Handle video autoplay
  useEffect(() => {
    const currentItem = items[currentIndex];

    // Pause all videos first
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    // Play current video if it's a video type
    if (currentItem?.type === "video" && currentItem.id) {
      const currentVideo = videoRefs.current[currentItem.id];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(console.error);
      }
    }

    // Call onItemChange callback
    if (onItemChange) {
      onItemChange(currentIndex, currentItem);
    }
  }, [currentIndex, items, onItemChange]);

  const renderContent = (item: ReelItem) => {
    switch (item.type) {
      case "video":
        return (
          <video
            ref={(el) => {
              if (el) videoRefs.current[item.id] = el;
            }}
            src={item.videoUrl || (item.content as string)}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />
        );
      case "image":
        return (
          <Image
            src={item.imageUrl || (item.content as string)}
            alt=""
            className="w-full h-full object-cover"
          />
        );
      case "text":
        return (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div className="text-white text-2xl font-bold">
              {item.text || item.content}
            </div>
          </div>
        );
      case "custom":
        return item.customComponent || item.content;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            {item.content}
          </div>
        );
    }
  };

  const variants = {
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-dvh overflow-hidden bg-black ${className}`}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {renderContent(items[currentIndex])}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
