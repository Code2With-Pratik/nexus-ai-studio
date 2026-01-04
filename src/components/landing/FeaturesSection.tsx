import { FileText, Image, Eraser, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: FileText,
    title: "AI Blog Writer",
    description: "Generate engaging blog posts on any topic with customizable tone and style.",
  },
  {
    icon: Image,
    title: "Image Generator",
    description: "Create stunning images from text prompts with multiple style options.",
  },
  {
    icon: Eraser,
    title: "Background Remover",
    description: "Remove backgrounds from images instantly with AI precision.",
  },
  {
    icon: MessageSquare,
    title: "Social Media Post Creator",
    description: "Create viral social media posts with AI-powered suggestions.",
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Powerful AI Tools
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Explore our suite of intelligent tools designed to boost your productivity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:glow-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                {feature.description}
              </p>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Try Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
