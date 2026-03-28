import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MaturityHeatmap from "./MaturityHeatmap";

export default function ExportApp() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MaturityHeatmap />
    </TooltipProvider>
  );
}
