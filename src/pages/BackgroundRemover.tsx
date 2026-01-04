import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eraser } from "lucide-react";

export default function BackgroundRemover() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Background Remover</h1>
        <p className="mt-2 text-muted-foreground">
          Remove backgrounds from images instantly with AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eraser className="h-5 w-5 text-primary" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            This tool is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Eraser className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">Background Remover</p>
            <p className="text-sm">We're working hard to bring you this feature soon!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
