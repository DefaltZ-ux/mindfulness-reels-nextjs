"use client";

import { useEffect, useState } from "react";
import { ReelsContainer } from "@/components/reels-container";
import { useLikedSlides } from "@/hooks/use-liked-slides";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function LikedPage() {
  const { likedSlides, isLoading } = useLikedSlides();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-primary">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-lg">Loading your liked moments...</p>
        </div>
      </div>
    );
  }

  if (likedSlides.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-300">
        <div className="text-center text-white px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/60" />
            <h1 className="text-3xl mb-4">No Liked Moments Yet</h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Start exploring mindful quotes and double-tap the ones that
              resonate with you.
            </p>
            <Link href="/">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Explore Quotes
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ReelsContainer
        initialSlides={likedSlides}
        showNavigation={false}
        isLikedPage={true}
      />

      {/* Custom navigation for liked page */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-2 rounded-md">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <span className="text-sm font-medium">
            {likedSlides.length} Liked
          </span>
        </div>
      </div>
    </main>
  );
}
