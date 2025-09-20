"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { ImagesIcon, SwatchesIcon } from "@phosphor-icons/react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

export default function ThemePage() {
  const { themeType, audioEnabled, setThemeType, setAudioEnabled } =
    useThemeStore();

  console.log(audioEnabled);

  return (
    <>
      <div className="min-h-dvh max-w-4xl md:pt-16 bg-background mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky top-0 z-40 bg-background/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 px-4 py-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-primary hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Theme Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Customize your mindful experience
              </p>
            </div>
          </div>
        </motion.div>

        {/* Background Settings */}
        <div className="p-4 m-4 border-2 rounded-xl flex flex-col gap-3">
          <div className="title">
            <p className="text-lg md:text-2xl font-semibold">Background</p>
          </div>
          <div className="setting flex-1 flex gap-4 justify-center items-center">
            {/* Colors Option */}
            <div
              className={cn(
                "bg-primary h-20 flex flex-col justify-center items-center flex-1 rounded-md border-4 border-background",
                themeType === "color" ? "outline-4" : ""
              )}
              onClick={() => setThemeType("color")}
            >
              <SwatchesIcon weight="regular" size={24} className="text-white" />
              <p className="text-white">Random Colors</p>
            </div>

            {/* Photos Option */}
            <div
              className={cn(
                "relative h-20 flex-1 rounded-md bg-[url(/images/serene-mountain-landscape-with-clouds.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden border-4 border-background",
                themeType === "image" ? "outline-4" : ""
              )}
              onClick={() => setThemeType("image")}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
                <ImagesIcon weight="regular" size={24} className="text-white" />
                <p className="text-white">Random Photos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="p-4 m-4 border-2 rounded-xl flex flex-col gap-3">
          {/* Audio Switch */}
          <div className="title">
            <label
              id="audio-switch"
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <p className="text-lg md:text-2xl font-semibold">Audio</p>

              <div className="relative">
                <input
                  id="audio-switch"
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={() => setAudioEnabled(!audioEnabled)}
                  className="sr-only"
                />
                <div className="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
                <div
                  className={cn(
                    "absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-300",
                    audioEnabled && "left-7"
                  )}
                ></div>
              </div>
            </label>
          </div>
          {/* Audio Options */}
          <div className="flex gap-4 justify-between items-center">
            <div className="flex-1">
              <audio src="/audios/fire.mp3">
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}
