"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface AudioCardProps {
  title: string;
  icon: React.ReactNode;
  audioSrc: string;
  onSelect?: (title: string, isPlaying: boolean) => void;
}

export default function AudioCard({
  title,
  icon,
  audioSrc,
  onSelect,
}: AudioCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      // pause all other playing audios
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
      onSelect?.(title, true);
    } else {
      audio.pause();
      setIsPlaying(false);
      onSelect?.(title, false);
    }
  }

  // When the audio ends, reset state
  function handleEnded() {
    setIsPlaying(false);
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center p-4 rounded-md shadow cursor-pointer bg-white hover:bg-gray-100 transition",
        isPlaying && "bg-orange-500/25"
      )}
      onClick={togglePlay}
    >
      <div className="text-3xl">{icon}</div>
      <p className="mt-2 text-sm font-medium">{title}</p>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onEnded={handleEnded}
      />
    </div>
  );
}
