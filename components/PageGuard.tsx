"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserTracker } from "@/lib/user-tracking";

interface PageGuardProps {
  children: React.ReactNode;
}

export function PageGuard({ children }: PageGuardProps) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const shouldShowLandingPage = UserTracker.shouldShowLandingPage();

    const LANDING_PAGE = "/";
    const FEED_PAGE = "/feed";

    if (shouldShowLandingPage) {
      router.replace(LANDING_PAGE); // always go to landing first if required
      setReady(true);
      return;
    } else {
      router.replace(FEED_PAGE);
      UserTracker.updateLastVisit();
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
