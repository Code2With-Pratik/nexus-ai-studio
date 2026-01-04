import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Eraser, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickTools = [
  {
    title: "AI Blog Writer",
    description: "Generate engaging blog posts",
    icon: FileText,
    href: "/dashboard/blog-writer",
    credits: 20,
  },
  {
    title: "Image Generator",
    description: "Create stunning AI images",
    icon: Image,
    href: "/dashboard/image-generator",
    credits: 10,
  },
  {
    title: "Background Remover",
    description: "Remove backgrounds instantly",
    icon: Eraser,
    href: "/dashboard/background-remover",
    credits: 5,
  },
];

export default function DashboardHome() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {profile?.full_name?.split(" ")[0] || "Creator"}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ready to create something amazing? Choose a tool to get started.
        </p>
      </div>

      {/* Quick Tools Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Quick Access
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickTools.map((tool) => (
            <Card
              key={tool.title}
              className="group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              onClick={() => navigate(tool.href)}
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {tool.credits} credits
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Credits Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle>Your Credits</CardTitle>
          <CardDescription>
            You have {profile?.credits ?? 0} credits remaining
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-foreground">
              {profile?.credits ?? 0}
            </div>
            <Button variant="gradient" onClick={() => navigate("/dashboard/settings")}>
              Get More Credits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
