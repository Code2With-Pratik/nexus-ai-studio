import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBrain from "@/assets/hero-brain.png";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-16 gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 lg:flex-row lg:justify-between">
        {/* Left Content */}
        <div className="z-10 max-w-2xl text-center lg:text-left animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Unleash Your{" "}
            <span className="text-gradient">Creativity</span> with AI
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Your all-in-one platform for content generation. Create stunning images, 
            write engaging blogs, and more with the power of AI.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/auth")}
            >
              Get Started for Free
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <img
              src={heroBrain}
              alt="AI Brain Visualization"
              className="h-auto w-full max-w-lg lg:max-w-xl animate-float"
            />
            <div className="absolute inset-0 glow-primary rounded-full opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
