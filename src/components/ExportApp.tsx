import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import TOMPyramid from "./TOMPyramid";
import MaturityHeatmap from "./MaturityHeatmap";

const tabs = [
  { id: "pyramid" as const, label: "TOM Pyramide" },
  { id: "maturity" as const, label: "FP&A Reifegrad" },
];

export default function ExportApp() {
  const [activeTab, setActiveTab] = useState<"pyramid" | "maturity">("pyramid");

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <nav className="flex items-center justify-center pt-5 pb-2 px-4">
        <div className="glass-card rounded-full flex gap-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono-brand text-xs tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      {activeTab === "pyramid" ? <TOMPyramid /> : <MaturityHeatmap />}
    </TooltipProvider>
  );
}
