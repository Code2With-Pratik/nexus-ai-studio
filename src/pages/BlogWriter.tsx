import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, FileText, Copy, Check } from "lucide-react";

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "funny", label: "Funny" },
  { value: "informative", label: "Informative" },
  { value: "persuasive", label: "Persuasive" },
];

export default function BlogWriter() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const { profile, deductCredits, user } = useAuth();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    if (!profile || profile.credits < 20) {
      toast.error("Insufficient credits! You need at least 20 credits.");
      return;
    }

    setLoading(true);
    
    try {
      const success = await deductCredits(20);
      if (!success) {
        setLoading(false);
        return;
      }

      // Simulate blog generation (mock for now)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      const mockContent = `# ${topic}

## Introduction

In today's fast-paced digital world, understanding ${topic.toLowerCase()} has become more important than ever. This comprehensive guide will walk you through everything you need to know.

## Why ${topic} Matters

The significance of ${topic.toLowerCase()} cannot be overstated. Whether you're a beginner or an expert, there's always something new to learn and explore in this fascinating area.

## Key Takeaways

1. **Understanding the Basics**: Start with the fundamentals before diving deeper.
2. **Practical Applications**: Learn how to apply this knowledge in real-world scenarios.
3. **Future Trends**: Stay ahead of the curve by understanding where things are heading.

## Conclusion

We hope this article has provided valuable insights into ${topic.toLowerCase()}. Remember, continuous learning is the key to success in any field.

---
*Generated with Nexus AI - Your all-in-one content creation platform*`;

      setGeneratedContent(mockContent);

      if (user) {
        await supabase.from("generations").insert({
          user_id: user.id,
          tool_type: "blog_writer",
          prompt: `Topic: ${topic}, Tone: ${tone}`,
          result: mockContent,
          credits_used: 20,
        });
      }

      toast.success("Blog post generated successfully!");
    } catch (error) {
      toast.error("Failed to generate blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Blog Writer</h1>
        <p className="mt-2 text-muted-foreground">
          Generate engaging blog posts on any topic in seconds.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Create Blog Post
            </CardTitle>
            <CardDescription>
              Enter your topic and preferred tone. Costs 20 credits per generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="The Future of Artificial Intelligence"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="gradient"
              className="w-full"
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Writing...
                </>
              ) : (
                <>Write Article (20 credits)</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your blog post will appear here.
                </CardDescription>
              </div>
              {generatedContent && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Writing your blog post...</p>
              </div>
            ) : generatedContent ? (
              <Textarea
                value={generatedContent}
                readOnly
                className="min-h-[400px] bg-secondary/30 border-border font-mono text-sm"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <FileText className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-sm">Your blog post will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
