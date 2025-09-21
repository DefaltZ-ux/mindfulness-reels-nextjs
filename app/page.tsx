"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Palette, Volume2, Share2, Sparkles, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserTracker } from "@/lib/user-tracking";
import { HeartIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    UserTracker.markLandingPageSeen();
    router.push("/feed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Mindfulness
          </span>
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={handleGetStarted}
            size="lg"
            className="border-2 border-primary hover:bg-primary text-primary hover:text-white p-2 px-3 md:p-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Transform your mindset daily
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 bg-gradient-to-r from-primary via-primary/50 to-primary bg-clip-text text-transparent">
            Embrace Your Journey with Daily Affirmations
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover a peaceful space where positive affirmations meet beautiful
            visuals. Swipe through personalized affirmations designed to uplift
            your spirit and nurture your mind.
          </p>

          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Begin Your Journey
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Everything you need for mindful moments
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Designed to create a personalized and calming experience that fits
            seamlessly into your daily routine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Like & Save</h3>
              <p className="text-sm text-muted-foreground">
                Heart your favorite affirmations and revisit them anytime in
                your personal collection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Custom Themes</h3>
              <p className="text-sm text-muted-foreground">
                Choose between soothing colors or beautiful nature images as
                your backdrop.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Audio Control</h3>
              <p className="text-sm text-muted-foreground">
                Toggle peaceful background sounds to enhance your mindfulness
                experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share Positivity</h3>
              <p className="text-sm text-muted-foreground">
                Spread good vibes by sharing meaningful affirmations with
                friends and family.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Affirmation Preview */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Experience the magic
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Swipe through beautiful affirmations designed to inspire and uplift
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-primary flex items-center justify-center relative">
                <div className="text-center p-8">
                  <p className="text-2xl font-medium text-balance leading-relaxed text-white">
                    I am worthy of love, happiness, and all the beautiful things
                    life has to offer.
                  </p>
                </div>

                {/* Action buttons overlay */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <PaperPlaneTiltIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">
            Ready to start your mindfulness journey?
          </h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Join thousands who have transformed their daily routine with
            positive affirmations.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Start Your Practice Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Mindfulness</span>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © 2024 Mindfulness. Nurturing minds, one affirmation at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
