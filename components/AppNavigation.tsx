"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, HeartIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/use-mobile";
import { useLikedSlidesStore } from "@/store/liked-slides-store";

const navItems = [
  { href: "/", icon: HouseIcon, label: "Home" },
  { href: "/liked", icon: HeartIcon, label: "Liked" },
  //   { href: "/theme", icon: Settings, label: "Theme" },
];

export default function AppNavigation() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { likedSlides } = useLikedSlidesStore();

  if (isMobile) {
    return (
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-background/50 backdrop-blur-sm z-50 h-12 flex items-center"
      >
        {/* bg-background/50 backdrop-blur-sm */}
        <div className="flex items-center justify-around flex-1 py-2">
          {navItems.map(({ href, icon: Icon }) => {
            const isActive = pathname === href;
            const showBadge = href === "/liked" && likedSlides.length > 0;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon
                    size={24}
                    color={"black"}
                    weight={isActive ? "fill" : "regular"}
                  />
                  {showBadge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {likedSlides.length > 9 ? "9+" : likedSlides.length}
                    </motion.div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <HeartIcon
                weight="bold"
                className="w-4 h-4 text-primary-foreground"
              />
            </div>
            <span className="font-semibold text-lg">Mindfulness</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              const showBadge = href === "/liked" && likedSlides.length > 0;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium",
                    isActive
                      ? "text-orange-700 bg-orange-200/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <div className="relative">
                    <Icon size={18} />
                    {showBadge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                      >
                        {likedSlides.length > 9 ? "9+" : likedSlides.length}
                      </motion.div>
                    )}
                  </div>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-tab"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
