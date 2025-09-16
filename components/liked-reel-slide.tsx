"use client";

import { motion, AnimatePresence } from "motion/react";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ReelSlide } from "@/lib/quotes";
import { Button } from "@/components/ui/button";

interface LikedReelSlideProps {
  slide: ReelSlide;
  onUnlike?: (slideId: string) => void;
}

export function LikedReelSlideComponent({
  slide,
  onUnlike,
}: LikedReelSlideProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUnlike = async () => {
    setIsDeleting(true);
    // Add a small delay for better UX
    setTimeout(() => {
      onUnlike?.(slide.id);
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }, 300);
  };

  return (
    <div
      className="relative h-dvh w-full flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: slide.backgroundColor }}
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

      {/* Unlike Button */}
      <motion.button
        className="absolute bottom-8 right-8 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
        onClick={() => setShowConfirmDelete(true)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <div className="w-6 h-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Heart className="w-6 h-6 fill-red-500 text-red-500" />
        )}
      </motion.button>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Remove from Liked?
              </h3>
              <p className="text-gray-600 mb-6">
                This quote will be removed from your liked collection.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleUnlike}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Removing..." : "Remove"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Indicators */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <p className="text-xs font-medium rotate-90 whitespace-nowrap">
            Swipe
          </p>
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [3, -3, 3] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Liked indicator */}
      <div className="absolute bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-sm text-center">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <p>Tap heart to remove</p>
        </div>
      </div>
    </div>
  );
}
