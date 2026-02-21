import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Compass, Target, Shield, Users, Workflow, Database, type LucideIcon } from "lucide-react";

interface Layer {
  id: number;
  label: string;
  question: string;
  subtitle: string;
  color: string;
  Icon: LucideIcon;
  description: string;
  finance: string;
  marketing: string;
}

const layers: Layer[] = [
  {
    id: 0,
    label: "Strategie & Zielbild",
    question: "WOHIN?",
    subtitle: "Richtung & Ambition",
    color: "#64B5C6",
    Icon: Compass,
    description:
      "Vision der Abteilung, strategische Prioritäten, Wertbeitrag zum Unternehmen, Alignment mit Unternehmens-/PE-Strategie, Transformationsziele.",
    finance:
      "Finance als strategischer Business Partner mit datengetriebener Entscheidungsunterstützung, automatisierten Standardprozessen und investorengerechtem Reporting – Close in 5 Tagen.",
    marketing:
      "Marketing als Revenue Engine mit messbarem Pipeline-Beitrag, skalierbarer Demand Generation und datenbasierter Budgetallokation.",
  },
  {
    id: 1,
    label: "Service Delivery Model",
    question: "WAS & FÜR WEN?",
    subtitle: "Leistungsversprechen",
    color: "#4A9CAD",
    Icon: Target,
    description:
      "Definition der Leistungen an interne/externe Stakeholder. Service-Katalog, SLAs, Qualitätsstandards, Interaktionsmodell mit dem Business.",
    finance:
      "Monatlicher Management Report (SLA: BD+5), Ad-hoc-Analysen (SLA: 48h), Investor Reporting Package (quartalsweise), Business Partner Advisory.",
    marketing:
      "Pipeline Contribution Report (wöchentlich), Campaign Performance Dashboards (Echtzeit), Quarterly Brand Health Assessment, Sales Enablement Packages.",
  },
  {
    id: 2,
    label: "Governance & Steuerung",
    question: "INNERHALB WELCHER REGELN?",
    subtitle: "Rahmen & Kontrolle",
    color: "#4CAF7A",
    Icon: Shield,
    description:
      "Entscheidungswege, Richtlinien, interne Kontrollen (IKS), Compliance-Rahmen, RACI-Matrizen, Approval Workflows, Reporting Lines.",
    finance:
      "Signing Authority Matrix, Accounting Policies, Close Calendar mit Deadlines, SOX/ISAE-Controls, Investment Committee Governance.",
    marketing:
      "Brand Guidelines & Approval-Prozess, Budget Governance, Datenschutz-Compliance (DSGVO) für Kampagnen, Vendor Management Policies.",
  },
  {
    id: 3,
    label: "Organisation, Rollen & Kompetenzen",
    question: "WER?",
    subtitle: "Menschen & Struktur",
    color: "#E5A84B",
    Icon: Users,
    description:
      "Organisationsstruktur, Rollenprofile, Skill-Matrix, Sourcing-Modell (Inhouse vs. Outsourced vs. Shared Services vs. CoE), Kapazitätsplanung.",
    finance:
      "FP&A vs. Accounting vs. Controlling, Business Partner Modell, Analyst-Rollen mit Datenanalyse-Skills, Shared Service Center für Transaktionsverarbeitung.",
    marketing:
      "Demand Gen vs. Product Marketing vs. Brand, Content-Team intern vs. Agentur, Growth-Rollen mit Analytics-Kompetenz.",
  },
  {
    id: 4,
    label: "Prozesse & Workflows",
    question: "WIE?",
    subtitle: "Abläufe & Automatisierung",
    color: "#5D7186",
    Icon: Workflow,
    description:
      "End-to-End-Prozesse, Teilprozesse, Automatisierungsgrad, Schnittstellen zwischen Abteilungen, SOP-Dokumentation.",
    finance:
      "Month-End Close (12→7→5 Tage), Procure-to-Pay, Record-to-Report, Planning & Forecasting Cycle, Invoice-to-Cash.",
    marketing:
      "Lead-to-MQL-Prozess, Campaign Execution Workflow, Content Production Pipeline, Budget Allocation & Reforecast Cycle.",
  },
  {
    id: 5,
    label: "Technologie, Daten & Infrastruktur",
    question: "WOMIT?",
    subtitle: "Werkzeuge & Fundament",
    color: "#3D4F5F",
    Icon: Database,
    description:
      "IT-Systemlandschaft, Datenarchitektur, Integrationen, Master Data Management, Infrastruktur (Cloud/On-Prem).",
    finance:
      "ERP-System (SAP, NetSuite), Konsolidierungstool, BI/Reporting-Plattform, Datenmodell für Revenue Recognition, Schnittstellen Billing↔GL.",
    marketing:
      "CRM, Marketing-Automation-Plattform, Attribution-Tools, Data Warehouse für Kampagnendaten, CDP (Customer Data Platform).",
  },
];

const PyramidLayer = ({
  layer,
  index,
  total,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  layer: Layer;
  index: number;
  total: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const progress = index / (total - 1);
  const widthPercent = 25 + 75 * progress;
  const isTop = index === 0;
  const IconComponent = layer.Icon;

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="animate-tom-reveal relative cursor-pointer transition-all duration-200 ease-out flex items-center justify-center gap-3"
      style={{
        width: `${widthPercent}%`,
        height: 76,
        animationDelay: `${index * 0.07}s`,
        borderRadius:
          index === 0
            ? "10px 10px 4px 4px"
            : index === total - 1
            ? "4px 4px 10px 10px"
            : "4px",
        background: isTop
          ? `linear-gradient(135deg, ${layer.color}, #4A9CAD)`
          : `rgba(20, 30, 42, 0.55)`,
        backdropFilter: isTop ? undefined : "blur(12px)",
        WebkitBackdropFilter: isTop ? undefined : "blur(12px)",
        border: isHovered
          ? `1px solid ${layer.color}90`
          : isTop
          ? `1px solid ${layer.color}40`
          : "1px solid rgba(255,255,255,0.08)",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
        boxShadow: isHovered
          ? `0 8px 32px ${layer.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Left accent line */}
      <div
        className="absolute left-0 top-[20%] bottom-[20%] w-0.5 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: isHovered ? layer.color : "transparent",
        }}
      />

      <IconComponent
        size={22}
        className="flex-shrink-0"
        style={{ color: isTop ? "#0A1017" : `${layer.color}90` }}
      />

      <div className="text-center min-w-0">
        <div
          className="font-display font-semibold tracking-wide leading-tight truncate"
          style={{
            fontSize: widthPercent < 45 ? 14 : 16,
            color: isTop ? "#0A1017" : "hsl(195 40% 93%)",
          }}
        >
          {layer.label}
        </div>
        {widthPercent > 40 && (
          <div
            className="font-mono-brand text-[10px] tracking-[0.1em] mt-1"
            style={{
              color: isTop ? "#0A101780" : "hsl(210 13% 45% / 0.6)",
            }}
          >
            {layer.question}
          </div>
        )}
      </div>

      {/* Hover subtitle tag */}
      {isHovered && widthPercent > 55 && (
        <div
          className="absolute -right-32 font-mono-brand text-[9px] tracking-wide opacity-80 whitespace-nowrap animate-tom-fade-in hidden lg:block"
          style={{ color: layer.color }}
        >
          → {layer.subtitle}
        </div>
      )}
    </div>
  );
};

const DetailModal = ({
  layer,
  open,
  onClose,
}: {
  layer: Layer | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!layer) return null;
  const IconComponent = layer.Icon;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="glass-card sm:max-w-[620px] p-0 gap-0 border-border/60 shadow-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `${layer.color}15`,
                borderColor: `${layer.color}30`,
                color: layer.color,
              }}
            >
              <IconComponent size={22} />
            </div>
            <div>
              <DialogTitle className="font-display text-xl font-medium tracking-wide text-foreground">
                {layer.label}
              </DialogTitle>
              <DialogDescription className="font-mono-brand text-xs tracking-[0.12em] mt-1" style={{ color: layer.color }}>
                {layer.question} — {layer.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="p-6 pt-4">
          <TabsList className="bg-muted/50 border border-border/40 mb-4">
            <TabsTrigger value="overview" className="font-mono-brand text-sm tracking-wide data-[state=active]:text-primary">
              ÜBERSICHT
            </TabsTrigger>
            <TabsTrigger value="finance" className="font-mono-brand text-sm tracking-wide data-[state=active]:text-[#4CAF7A]">
              FINANCE
            </TabsTrigger>
            <TabsTrigger value="marketing" className="font-mono-brand text-sm tracking-wide data-[state=active]:text-[#E5A84B]">
              MARKETING
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="text-base leading-relaxed text-muted-foreground mt-0">
            {layer.description}
          </TabsContent>

          <TabsContent value="finance" className="mt-0">
            <div className="font-mono-brand text-[11px] tracking-[0.15em] text-[#4CAF7A] mb-2.5">
              FINANCE-BEISPIEL
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">{layer.finance}</p>
          </TabsContent>

          <TabsContent value="marketing" className="mt-0">
            <div className="font-mono-brand text-[11px] tracking-[0.15em] text-[#E5A84B] mb-2.5">
              MARKETING-BEISPIEL
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">{layer.marketing}</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default function TOMPyramid() {
  const [active, setActive] = useState<Layer | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-10 md:py-16">
      {/* Header */}
      <header className="text-center mb-12 max-w-xl">
        <h1 className="font-display text-2xl md:text-[34px] font-semibold text-foreground leading-tight tracking-tight mb-3">
          Target Operating Model
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
          Jede Schicht ist Voraussetzung für die darüber liegende. Klicke auf eine Ebene für Details.
        </p>
      </header>

      {/* Pyramid Container */}
      <div className="relative w-full max-w-[820px] flex justify-center">
        {/* Left arrow – BOTTOM-UP / UMSETZUNG */}
        <div className="absolute left-0 top-8 bottom-8 w-14 hidden md:flex flex-col items-center justify-center">
          <span className="font-mono-brand text-[10px] tracking-[0.1em] text-muted-foreground mb-2">
            BOTTOM-UP
          </span>
          <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-muted-foreground/30 relative">
            <div className="absolute -top-1 -left-[4px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-border" />
          </div>
          <span
            className="font-mono-brand text-[11px] tracking-[0.15em] text-muted-foreground/80 mt-2"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            UMSETZUNG
          </span>
        </div>

        {/* Pyramid layers */}
        <div className="flex flex-col items-center gap-1.5 w-full max-w-[660px]">
          {layers.map((layer, i) => (
            <PyramidLayer
              key={layer.id}
              layer={layer}
              index={i}
              total={layers.length}
              isHovered={hovered === layer.id}
              onHover={() => setHovered(layer.id)}
              onLeave={() => setHovered(null)}
              onClick={() => setActive(layer)}
            />
          ))}
        </div>

        {/* Right arrow – TOP-DOWN / DESIGN */}
        <div className="absolute right-0 top-8 bottom-8 w-14 hidden md:flex flex-col items-center justify-center">
          <span className="font-mono-brand text-[10px] tracking-[0.1em] text-muted-foreground mb-2">
            TOP-DOWN
          </span>
          <div className="w-0.5 flex-1 bg-gradient-to-b from-muted-foreground/30 to-border relative">
            <div className="absolute -bottom-1 -left-[4px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-border" />
          </div>
          <span
            className="font-mono-brand text-[11px] tracking-[0.15em] text-muted-foreground/80 mt-2"
            style={{ writingMode: "vertical-rl" }}
          >
            DESIGN
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 flex gap-7 flex-wrap justify-center px-6 py-5 glass-card rounded-xl">
        <div className="text-center">
          <div className="font-mono-brand text-[8px] tracking-[0.12em] text-muted-foreground/50 mb-1.5">
            LESERICHTUNG DESIGN
          </div>
          <div className="text-xs text-muted-foreground">
            Strategie definiert → Technologie ermöglicht
          </div>
        </div>
        <div className="w-px h-8 bg-border hidden sm:block" />
        <div className="text-center">
          <div className="font-mono-brand text-[8px] tracking-[0.12em] text-muted-foreground/50 mb-1.5">
            LESERICHTUNG UMSETZUNG
          </div>
          <div className="text-xs text-muted-foreground">
            Fundament schaffen → Strategie realisieren
          </div>
        </div>
      </div>

      <DetailModal layer={active} open={!!active} onClose={() => setActive(null)} />
    </div>
  );
}
