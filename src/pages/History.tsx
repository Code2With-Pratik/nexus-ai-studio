import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { FileText, Image, Eraser, Clock } from "lucide-react";

interface Generation {
  id: string;
  tool_type: string;
  prompt: string;
  credits_used: number;
  created_at: string;
}

const toolIcons: Record<string, typeof FileText> = {
  blog_writer: FileText,
  image_generator: Image,
  background_remover: Eraser,
};

const toolLabels: Record<string, string> = {
  blog_writer: "Blog Writer",
  image_generator: "Image Generator",
  background_remover: "Background Remover",
};

export default function History() {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGenerations();
    }
  }, [user]);

  const fetchGenerations = async () => {
    const { data, error } = await supabase
      .from("generations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching generations:", error);
    } else {
      setGenerations(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">History</h1>
        <p className="mt-2 text-muted-foreground">
          View your past generations and creations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your last 50 generations across all tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : generations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Clock className="h-12 w-12 mb-2 opacity-50" />
              <p>No generations yet. Start creating!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {generations.map((gen) => {
                const Icon = toolIcons[gen.tool_type] || FileText;
                return (
                  <div
                    key={gen.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {toolLabels[gen.tool_type] || gen.tool_type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          -{gen.credits_used} credits
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {gen.prompt}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(gen.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
