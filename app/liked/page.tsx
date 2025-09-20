"use client";

import { useEffect, useState } from "react";
import { ReelsContainer } from "@/components/ReelsContainer";
import { useLikedSlidesStore } from "@/store/liked-slides-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { HeartIcon } from "@phosphor-icons/react";

export default function LikedPage() {
  const { likedSlides, isLoading, initializeStore } = useLikedSlidesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeStore();
  }, [initializeStore]);

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
      <div className="h-screen w-full flex items-center justify-center bg-primary/85">
        <div className="text-center text-white px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <HeartIcon className="w-16 h-16 mx-auto mb-6 text-white/75" />
            <h1 className="text-3xl font-bold mb-4">No Liked Moments Yet</h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Start exploring mindful quotes and double-tap the ones that
              resonate with you.
            </p>
            <Link href="/">
              <Button className="bg-white/50 text-black px-8 py-6 text-md rounded-3xl hover:bg-white/40 cursor-pointer">
                <ArrowLeft strokeWidth={3} className="w-5 h-5" />
                <span>Explore More</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh">
      <ReelsContainer
        initialSlides={likedSlides}
        isLikedPage={true}
      />
    </main>
  );
}
