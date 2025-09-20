"use client";

import { useRef } from "react";
// import { Play, Pause } from "lucide-react"; // nice icons from lucide-react

interface AudioCardProps {
  title: string;
  icon: React.ReactNode;
  audioSrc: string;
  onSelect?: (title: string) => void;
}

export default function AudioCard({
  title,
  icon,
  audioSrc,
  onSelect,
}: AudioCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  function handlePlay() {
    // Pause all other playing audios if any
    document
      .querySelectorAll("audio")
      .forEach((a) => a !== audioRef.current && a.pause());

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // start from beginning
      audioRef.current.play();
      onSelect?.(title);
    }
  }

  return (
    <div
      className="flex flex-col items-center p-4 rounded-2xl shadow cursor-pointer bg-white hover:bg-gray-100 transition"
      onClick={handlePlay}
    >
      <div className="text-3xl">{icon}</div>
      <p className="mt-2 text-sm font-medium">{title}</p>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
}
