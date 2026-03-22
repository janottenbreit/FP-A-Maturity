import { BarChart3, Search, TrendingUp, Handshake, Users, Database, type LucideIcon } from "lucide-react";

export interface CellData {
  desc: string;
  constraint: string;
  graduate: string;
}

export interface Dimension {
  id: string;
  label: string;
  Icon: LucideIcon;
}

export interface Level {
  id: number;
  name: string;
  short: string;
  color: string;
}

export const LEVELS: Level[] = [
  { id: 1, name: "Ad Hoc", short: "L1", color: "#E85D5D" },
  { id: 2, name: "Standardized", short: "L2", color: "#E8C36A" },
  { id: 3, name: "Partnering", short: "L3", color: "#D4A843" },
  { id: 4, name: "Strategic", short: "L4", color: "#4ECDC4" },
  { id: 5, name: "World-Class", short: "L5", color: "#2EE89A" },
];

export const DIMENSIONS: Dimension[] = [
  { id: "reporting", label: "Reporting", Icon: BarChart3 },
  { id: "analysis", label: "Analysis", Icon: Search },
  { id: "forecasting", label: "Forecasting", Icon: TrendingUp },
  { id: "consulting", label: "Consulting", Icon: Handshake },
  { id: "talent", label: "Talent", Icon: Users },
  { id: "data_tools", label: "Data / Tools", Icon: Database },
];

// cellData[dimensionId][levelId] => CellData
export const CELL_DATA: Record<string, Record<number, CellData>> = {
  reporting: {
    1: {
      desc: "Inkonsistent, manuell, Month End >2 Wochen. Back-Office-Rolle.",
      constraint: "Excel/manuell, keine Templates.",
      graduate: "Templates standardisieren, Basics automatisieren.",
    },
    2: {
      desc: "Monthly Packs konsistent, aber dicht und rückwärtsgewandt.",
      constraint: "Zu lang, kein Insight.",
      graduate: "Exec-ready Packs, KPIs, Kommentierung.",
    },
    3: {
      desc: "Reports auf BU-Ziele zugeschnitten.",
      constraint: "Komplex, nicht strategieverknüpft.",
      graduate: "Dashboards an Strategie gekoppelt.",
    },
    4: {
      desc: "KPI-Dashboards zentral im Leadership.",
      constraint: "Noch reaktiv.",
      graduate: "Alerts, Ops-Finance Integration.",
    },
    5: {
      desc: "Self-Service Dashboards, proaktive Insights.",
      constraint: "Risiko der Überladung.",
      graduate: "Insights einbetten, kontinuierlich vereinfachen.",
    },
  },
  analysis: {
    1: {
      desc: "Varianzkommentare vage.",
      constraint: "Accounting-Fokus auf 'Was', nicht 'Warum'.",
      graduate: "Root Cause, Treibermodelle.",
    },
    2: {
      desc: "Konsistente Varianzen, aber oberflächlich.",
      constraint: "Fokus auf 'Was', nicht 'Warum'.",
      graduate: "Root Cause mit Business-Input.",
    },
    3: {
      desc: "Treiber erklärt, BU-Kollaboration.",
      constraint: "Begrenzter Einfluss.",
      graduate: "Storytelling, Einfluss-Training.",
    },
    4: {
      desc: "Prescriptive Insights an Wachstumshebel gekoppelt.",
      constraint: "Noch reaktiv.",
      graduate: "Szenario-basierte Analyse.",
    },
    5: {
      desc: "Predictive, kontinuierliche Analyse treibt Strategie.",
      constraint: "Kapazität.",
      graduate: "Analytics COE, AI-gestützt.",
    },
  },
  forecasting: {
    1: {
      desc: "Nur Jahresbudget.",
      constraint: "Kein Reforecast.",
      graduate: "Quartals-Updates, Accuracy-Tracking.",
    },
    2: {
      desc: "Budget + Quartals-Forecasts, langsam.",
      constraint: "Ressourcenintensiv, >10% Varianz.",
      graduate: "Kürzere Zyklen.",
    },
    3: {
      desc: "Rolling Forecasts, BU-Input.",
      constraint: "Inkonsistente Kadenz.",
      graduate: "Monatlich rollierend formalisieren.",
    },
    4: {
      desc: "Forecasts steuern Allokation, Szenarien.",
      constraint: "Ops nicht integriert.",
      graduate: "Erweiterte Szenarien modelliert.",
    },
    5: {
      desc: "Predictive, Echtzeit-Forecasting.",
      constraint: "Tech-Abhängigkeitsrisiko.",
      graduate: "Kadenz + AI mit menschlichem Urteil kombinieren.",
    },
  },
  consulting: {
    1: {
      desc: "Finance als 'Budget-Polizei'.",
      constraint: "Kein Platz am Tisch.",
      graduate: "BU Check-ins, Reaktionsfähigkeit.",
    },
    2: {
      desc: "Einige BU Check-ins, einseitig.",
      constraint: "Reaktiv.",
      graduate: "BU-spezifisches Reporting, Joint Plans.",
    },
    3: {
      desc: "Analysten eingebettet in BU-Meetings.",
      constraint: "Begrenzter Einfluss.",
      graduate: "Dedizierte Partner, Business Acumen.",
    },
    4: {
      desc: "Finance formt proaktiv BU-Strategie.",
      constraint: "BU-Abdeckung inkonsistent.",
      graduate: "Coverage erweitern, Rolle formalisieren.",
    },
    5: {
      desc: "Finance unverzichtbar, CEO's Challenger.",
      constraint: "Talent.",
      graduate: "Partner-Rotationen, Enterprise Embedding.",
    },
  },
  talent: {
    1: {
      desc: "Unterbesetzt, Generalisten.",
      constraint: "Keine definierten Rollen.",
      graduate: "Rollen definieren, Kern-Analysten einstellen.",
    },
    2: {
      desc: "Analysten + Manager, Skills auf Reporting fokussiert.",
      constraint: "Vage Karrierepfade.",
      graduate: "Karriereleitern klären, Business-affin rekrutieren.",
    },
    3: {
      desc: "Mix aus Builders + Partners.",
      constraint: "Schwache Pipeline.",
      graduate: "Karrierepfade, Training in Einflussnahme.",
    },
    4: {
      desc: "Ausgewogener Mix, strukturierte Progression.",
      constraint: "Nachfolgeplanung, Retention-Risiko.",
      graduate: "Mentoring.",
    },
    5: {
      desc: "FP&A = Talentmagnet, Leadership Feeder.",
      constraint: "Kontinuierliche Entwicklung.",
      graduate: "Culture of Influence, CFO-Pipeline.",
    },
  },
  data_tools: {
    1: {
      desc: "Nur Excel + E-Mail.",
      constraint: "Fehler, langsam.",
      graduate: "Daten zentralisieren, BI-Basics.",
    },
    2: {
      desc: "Tools vorhanden, geringe Adoption.",
      constraint: "Noch Excel-lastig.",
      graduate: "Adoption verbessern, Single Source of Truth.",
    },
    3: {
      desc: "Tools effektiv, teils offline.",
      constraint: "Ops nicht integriert.",
      graduate: "Treiber integrieren, Feeds automatisieren.",
    },
    4: {
      desc: "Finance + Ops-Daten integriert, hohe Automatisierung.",
      constraint: "Overload-Risiko.",
      graduate: "Change Mgmt, Analytics COE.",
    },
    5: {
      desc: "AI-enabled, Self-Service Dashboards.",
      constraint: "Tech-Abhängigkeitsrisiko.",
      graduate: "Staff upskillen, Use Cases erweitern.",
    },
  },
};
