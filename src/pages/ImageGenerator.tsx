import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ImageIcon, Download } from "lucide-react";

const styles = [
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "realistic", label: "Realistic" },
  { value: "anime", label: "Anime" },
  { value: "fantasy", label: "Fantasy" },
  { value: "minimalist", label: "Minimalist" },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { profile, deductCredits, user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!profile || profile.credits < 10) {
      toast.error("Insufficient credits! You need at least 10 credits.");
      return;
    }

    setLoading(true);
    
    try {
      // Deduct credits first
      const success = await deductCredits(10);
      if (!success) {
        setLoading(false);
        return;
      }

      // Simulate image generation (mock for now)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Use a placeholder image for demo
      const mockImage = `https://picsum.photos/seed/${Date.now()}/512/512`;
      setGeneratedImage(mockImage);

      // Log the generation
      if (user) {
        await supabase.from("generations").insert({
          user_id: user.id,
          tool_type: "image_generator",
          prompt: `${prompt} (Style: ${style})`,
          result: mockImage,
          credits_used: 10,
        });
      }

      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Image Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Create stunning AI-generated images from text prompts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Generate Image
            </CardTitle>
            <CardDescription>
              Describe what you want to create. Costs 10 credits per generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                placeholder="A futuristic city skyline at sunset with flying cars..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="gradient"
              className="w-full"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>Generate (10 credits)</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Your generated image will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-lg border border-border bg-secondary/30 flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Creating your masterpiece...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p className="text-sm">Your image will appear here</p>
                </div>
              )}
            </div>

            {generatedImage && !loading && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => window.open(generatedImage, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
