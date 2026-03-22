import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Compass, Target, Shield, Users, Workflow, Database, type LucideIcon } from "lucide-react";

/* ── helpers ────────────────────────────────────── */

const BulletItem = ({ text, color = "#5D7186" }: { text: string; color?: string }) => (
  <div className="flex gap-2.5 items-start mb-2">
    <div
      className="w-[5px] h-[5px] rounded-full flex-shrink-0 mt-[7px]"
      style={{ backgroundColor: color }}
    />
    <span className="text-[13px] leading-[1.6]" style={{ color: "#B8C4D0" }}>
      {text}
    </span>
  </div>
);

const KPIBadge = ({ label }: { label: string }) => (
  <span
    className="inline-block px-2.5 py-[3px] rounded mr-1.5 mb-1.5 font-mono-brand"
    style={{
      fontSize: 10,
      letterSpacing: "0.02em",
      background: "#1E2A3680",
      border: "1px solid #2C3E50",
      color: "#64B5C6",
    }}
  >
    {label}
  </span>
);

/* ── types ──────────────────────────────────────── */

interface DepartmentData {
  intro: string;
  items: string[];
  kpis: string[];
}

interface Layer {
  id: number;
  label: string;
  question: string;
  subtitle: string;
  color: string;
  Icon: LucideIcon;
  description: string;
  details: string[];
  finance: DepartmentData;
  marketing: DepartmentData;
}

/* ── data ───────────────────────────────────────── */

const layers: Layer[] = [
  {
    id: 0,
    label: "Strategie & Zielbild",
    question: "WOHIN?",
    subtitle: "Richtung & Ambition",
    color: "#64B5C6",
    Icon: Compass,
    description:
      "Die Spitze definiert die strategische Ambition: Welchen Wertbeitrag leistet die Abteilung zum Unternehmen? Welche Rolle spielt sie in der Wertschöpfung? Alle darunter liegenden Schichten sind Mittel zum Zweck, um dieses Zielbild zu realisieren.",
    details: [
      "Vision & Mission der Abteilung – abgeleitet aus der Unternehmensstrategie",
      "Strategische Prioritäten & Transformationsziele (3–5 Jahre Horizont)",
      "Alignment mit PE-Investmentthese bzw. Unternehmens-/Konzernstrategie",
      "Definition des Wertbeitrags: Enabler vs. strategischer Business Partner vs. Revenue Driver",
      "Capability Gap Assessment: As-Is vs. To-Be Zustand inkl. Roadmap",
      "Change Narrative: Kommunizierbares Zielbild als Basis für Stakeholder Buy-In",
    ],
    finance: {
      intro:
        "Die CFO-Organisation transformiert sich vom Number Cruncher zum strategischen Business Partner – in PE-Kontexten mit klarem Fokus auf Exit-Readiness und Value Creation.",
      items: [
        'Zielbild: \u201EFinance als strategischer Business Partner mit datengetriebener Entscheidungsunterst\u00FCtzung, automatisierten Standardprozessen und investorengerechtem Reporting \u2013 Close \u22645 BD\u201C',
        "PE-Kontext: Alignment der Finance-Strategie mit Value Creation Plan des Sponsors (z.B. EBITDA-Expansion, NRR-Verbesserung, Working Capital Optimierung)",
        "Three-Pillar-Modell (Deloitte): Operational Finance (transaktional) → Business Finance (advisory) → Specialized Finance (M&A, Tax, Treasury)",
        "Kompetenzshift: Von HGB-/IFRS-Buchhaltung zu Datenanalyse, Szenariomodellierung und Ökonometrie",
        "Exit-Readiness: Aufbau eines audit-fähigen Reportings mit konsistenten KPIs (ARR, NRR, Rule of 40, LTV/CAC) ab Tag 1",
      ],
      kpis: [
        "Rule of 40 Score",
        "Close Cycle Time (BD)",
        "Finance Cost as % of Revenue",
        "FTE Ratio Finance:Gesamtunternehmen",
        "Forecast Accuracy (±%)",
      ],
    },
    marketing: {
      intro:
        "Marketing entwickelt sich von der Kostenstelle zur Revenue Engine – mit messbarem Beitrag zur Pipeline und datenbasierter Allokation.",
      items: [
        'Zielbild: \u201EMarketing als Revenue Engine mit messbarem Pipeline-Beitrag, skalierbarer Demand Generation und datenbasierter Budgetallokation\u201C',
        "Shift von Activity-Based zu Revenue-Aligned Marketing – KPIs an Unternehmensziele gekoppelt",
        "Integration in RevOps: Marketing, Sales und Customer Success als integriertes Revenue Team",
        "Markenpositionierung als strategisches Asset: Brand Equity in Unternehmensbewertung verankern",
        "SaaS-Kontext: Fokus auf Pipeline Velocity, CAC Efficiency und Expansion Revenue",
      ],
      kpis: [
        "Marketing-Sourced Pipeline (%)",
        "CAC Payback Period (Monate)",
        "Marketing ROI / ROMI",
        "Brand Awareness Index",
        "Pipeline Velocity",
      ],
    },
  },
  {
    id: 1,
    label: "Service Delivery Model",
    question: "WAS & FÜR WEN?",
    subtitle: "Leistungsversprechen",
    color: "#4A9CAD",
    Icon: Target,
    description:
      "Das Service Delivery Model bündelt alle darunter liegenden Schichten zu einem konkreten Leistungsversprechen. Es beantwortet: Was liefern wir, an wen, in welcher Qualität und bis wann? Es definiert das Sourcing-Modell: Welche Leistungen werden inhouse, via Shared Services, über ein Center of Excellence (CoE) oder extern erbracht?",
    details: [
      "Service-Katalog: Vollständiges Verzeichnis aller Leistungen mit definierten Service Levels",
      "Sourcing-Strategie: Inhouse vs. Shared Service Center (SSC) vs. Center of Excellence (CoE) vs. Outsourcing",
      "SLA-Framework: Verbindliche Qualitäts- und Zeitstandards pro Service (z.B. BD+5 für Monthly Close)",
      "Interaktionsmodell: Wie interagiert die Abteilung mit dem Business? (Ticket-basiert, Business Partner, Embedded)",
      "Tiering: Einteilung in Self-Service (Tier 0), Standard (Tier 1), Spezialist (Tier 2), Strategic Advisory (Tier 3)",
      "Demand Management: Priorisierung und Kapazitätssteuerung eingehender Anfragen",
    ],
    finance: {
      intro:
        "Finance liefert entlang eines klaren Leistungskatalogs – von transaktionalen Standardservices bis hin zu strategischer Entscheidungsunterstützung auf C-Level.",
      items: [
        "Tier 0 – Self-Service: Standardreports via BI-Tool (Dashboards, KPI-Monitoring), automatisierte Rechnungsstellung",
        "Tier 1 – Transaktional (SSC): AP/AR-Processing, Reisekostenabrechnung, Intercompany-Abstimmung, Stammdatenpflege",
        "Tier 2 – Spezialist: Monatlicher Management Report (SLA: BD+5), Investor Reporting Package (quartalsweise), Ad-hoc-Analysen (SLA: 48h), Revenue Recognition, Tax Compliance",
        "Tier 3 – Strategic Advisory: Business Partner Advisory für Geschäftsbereiche, M&A-Support, Szenariomodellierung, Board Deck Preparation",
        "PE-Kontext: Sponsor-spezifisches Reporting (Monthly Lender Package, Quarterly Board Deck, Annual Budget) als dedizierter Service mit festen Deadlines",
      ],
      kpis: [
        "SLA Adherence Rate (%)",
        "Cost per Transaction",
        "Service Satisfaction Score",
        "Ticket Resolution Time",
        "Self-Service Adoption Rate (%)",
      ],
    },
    marketing: {
      intro:
        "Marketing definiert sein Leistungsversprechen entlang des Funnel – von Awareness-Generierung bis Revenue Attribution.",
      items: [
        "Demand Generation Services: Campaign Execution, Content Production, Paid Media Management, Event Management",
        "Analytics & Reporting: Pipeline Contribution Report (wöchentlich), Campaign Performance Dashboards (Echtzeit), Attribution Reporting (monatlich)",
        "Sales Enablement: Content Packages pro Buyer Persona, Competitive Battle Cards, Case Studies, ROI Calculators",
        "Brand Services: Brand Health Assessment (quartalsweise), Visual Identity Management, PR & Comms",
        "Sourcing: Content Creation häufig hybrid (intern + Agentur), Performance Marketing oft spezialisiert extern, Brand & Strategy immer intern",
      ],
      kpis: [
        "Content Production Cycle Time",
        "Campaign Launch Lead Time",
        "Marketing Qualified Leads (MQL) pro Monat",
        "Lead Response Time",
        "Sales Enablement Usage Rate (%)",
      ],
    },
  },
  {
    id: 2,
    label: "Governance & Steuerung",
    question: "INNERHALB WELCHER REGELN?",
    subtitle: "Rahmen & Kontrolle",
    color: "#4CAF7A",
    Icon: Shield,
    description:
      "Governance setzt den Rahmen, innerhalb dessen Organisation und Prozesse operieren. Ohne klare Governance entstehen Schatten-IT, informelle Entscheidungswege, Kontrollverlust und Compliance-Risiken. In PE-Kontexten ist Governance besonders kritisch: Investoren erwarten nachvollziehbare Entscheidungswege, saubere Controls und belastbare Daten.",
    details: [
      "Entscheidungsrechte: Wer entscheidet was bis zu welcher Höhe? (Signing Authority Matrix, Approval Workflows)",
      "RACI-Matrizen: Klare Verantwortlichkeiten über Abteilungsgrenzen hinweg",
      "Internes Kontrollsystem (IKS): Segregation of Duties, 4-Augen-Prinzip, Abstimmungsprozesse",
      "Compliance-Rahmen: Regulatorische Anforderungen (HGB, IFRS, SOX/ISAE 3402, DSGVO)",
      "Richtlinien & Policies: Verbindliche Regelwerke für wiederkehrende Entscheidungen",
      "Performance Management: KPI-Kaskade von Unternehmenszielen bis auf Teamebene, regelmäßige Reviews",
      "Data Governance: Datenqualität, Datenhoheit, Master Data Ownership, Single Source of Truth",
    ],
    finance: {
      intro:
        "Finance Governance ist das Kontroll-Rückgrat der Organisation – in PE-backed Companies oft der erste Bereich, der nach Closing aufgebaut oder verschärft wird.",
      items: [
        "Signing Authority Matrix: Gestaffelte Freigabelimits (z.B. bis €5k Teamlead, bis €25k Director, bis €100k CFO, darüber Board)",
        "Close Calendar: Verbindlicher Zeitplan mit Deadlines und Verantwortlichkeiten pro Close-Schritt, Eskalationsregeln bei Verzug",
        "Accounting Policies Manual: Einheitliche Bilanzierungs- und Bewertungsrichtlinien (Revenue Recognition, Capitalization, Provisions)",
        "SOX/ISAE 3402 Controls: Dokumentierte Key Controls, Test-of-Design und Test-of-Effectiveness, Remediation Tracking",
        "Investment Committee Governance: Strukturierte Entscheidungsprozesse für CapEx, M&A, größere Verträge",
        "PE Reporting Governance: Feste Deadlines für Lender Reports, Board Packages, Covenant Compliance Monitoring",
        "Data Governance: Eindeutige Ownership für KPIs (z.B. ARR-Definition einheitlich über alle Entities)",
      ],
      kpis: [
        "Audit Findings (#)",
        "Control Deficiencies (#)",
        "Policy Compliance Rate (%)",
        "Covenant Compliance (Headroom %)",
        "Restatement Frequency",
      ],
    },
    marketing: {
      intro:
        "Marketing Governance stellt sicher, dass Brand, Budget und Compliance konsistent gemanagt werden – besonders kritisch bei Multi-Entity- oder Multi-Market-Strukturen.",
      items: [
        "Brand Guidelines & Approval: Mehrstufiger Review-Prozess für externe Kommunikation, Brand Consistency Audits",
        "Budget Governance: Wer genehmigt Marketing-Spend ab welcher Höhe? Quarterly Reforecast mit CFO-Alignment",
        "DSGVO-Compliance: Opt-In-Management, Cookie Consent, Datenlöschprozesse, Auftragsverarbeitungsverträge mit Agenturen",
        "Vendor Management: Preferred Supplier List, Rahmenverträge, regelmäßige Performance Reviews für Agenturen",
        "Content Governance: Editorial Calendar, Tone of Voice Guidelines, Freigabeprozesse für regulierte Branchen",
        "Attribution Governance: Einheitliche Definition von MQL/SQL-Kriterien, verbindliches Attributionsmodell (First Touch, Multi-Touch)",
      ],
      kpis: [
        "Brand Consistency Score",
        "Budget Variance vs. Plan (%)",
        "DSGVO Incident Rate",
        "Vendor Performance Score",
        "Attribution Model Coverage (%)",
      ],
    },
  },
  {
    id: 3,
    label: "Organisation, Rollen & Kompetenzen",
    question: "WER?",
    subtitle: "Menschen & Struktur",
    color: "#E5A84B",
    Icon: Users,
    description:
      "Prozesse brauchen Menschen mit den richtigen Fähigkeiten in der richtigen Struktur. Diese Schicht definiert, wer was macht, wie die Organisation aufgebaut ist und welche Kompetenzen benötigt werden. Laut Deloitte verschieben sich Finance-Strukturen von funktionalen Silos hin zu Capability-basierten Teams mit flexiblen, multidisziplinären Task Forces.",
    details: [
      "Organisationsdesign: Funktional vs. Matrix vs. Capability-basiert, Reporting Lines, Spans & Layers",
      "Rollenprofile & Job Families: Klare Stellenbeschreibungen mit Skill-Anforderungen und Karrierepfaden",
      "Skill-Matrix: Erfassung vorhandener vs. benötigter Kompetenzen, Gap-Analyse als Basis für Upskilling",
      "Sourcing-Modell: Inhouse (Festanstellung) vs. Interim/Freelance vs. Nearshore/Offshore vs. Outsourcing",
      "Kapazitätsplanung: FTE-Bedarf pro Funktion, Auslastungssteuerung, Peak-Planung (z.B. Close, Budget Season)",
      "Talent Management: Recruiting-Pipeline, Retention-Maßnahmen, Nachfolgeplanung für Schlüsselpositionen",
      "Multidisziplinäre Teams: Agile Task Forces für Projekte (M&A, System-Implementierung, Ad-hoc-Analysen)",
    ],
    finance: {
      intro:
        "Finance-Organisationen werden kleiner, aber spezialisierter. Der Anteil transaktionaler Rollen sinkt durch Automatisierung – der Bedarf an Analytics, Business Partnering und Spezialdisziplinen steigt.",
      items: [
        "Three-Pillar-Org: Operational Finance (Accounting, AP/AR, Close) → Business Finance (FP&A, Business Partnering, Controlling) → Specialized Finance (Tax, Treasury, M&A, IR)",
        "Business Partner Modell: Dedizierte Finance Business Partner pro Geschäftsbereich – embedded im operativen Team, nicht in der Zentrale",
        "Skill-Shift: Klassische Buchhaltungs-Skills werden durch Datenanalyse (SQL, Python, BI-Tools), Szenariomodellierung und Kommunikationsfähigkeit ergänzt",
        "CoE-Ansatz (Deloitte): Center of Excellence für Spezialdisziplinen (Konsolidierung, Revenue Recognition, Transfer Pricing) – economies of skill statt nur economies of scale",
        "SSC für Transaktionen: AP/AR, Travel & Expense, Intercompany – oft nearshore (z.B. Polen, Portugal) bei PE-backed Companies mit Multi-Entity-Struktur",
        "PE-typische Rollen: Head of FP&A, Investor Relations/Reporting Manager, Integration Manager (post-M&A), Data Analyst / Finance Analytics",
      ],
      kpis: [
        "Finance FTE Ratio (Finance FTEs / 1.000 Revenue)",
        "Span of Control",
        "Voluntary Turnover Rate (%)",
        "Training Hours pro FTE",
        "Time-to-Fill kritische Positionen",
      ],
    },
    marketing: {
      intro:
        "Marketing-Organisationen differenzieren sich zunehmend entlang des Funnels – mit steigendem Bedarf an Analytics- und Ops-Kompetenz neben klassischem Creative.",
      items: [
        "Kernteams: Demand Generation vs. Product Marketing vs. Brand & Comms vs. Marketing Operations",
        "Operations als eigene Disziplin: Tech Stack Management, Datenqualität, Prozessautomatisierung, Reporting",
        "Content: Strategische Entscheidung intern vs. extern – Thought Leadership immer intern, Produktion häufig Agentur",
        "Growth-Rollen: Performance Marketing, Conversion Rate Optimization, Marketing Analytics – Hybrid aus Marketing und Data Science",
        "RevOps-Integration: In SaaS-Unternehmen zunehmend gemeinsames Team mit Sales Ops und CS Ops unter einem VP RevOps",
        "Freelancer/Agentur-Mix: Kern-Team fest angestellt, Spezialdisziplinen (SEO, Paid, Design) flexibel über Agentur-Retainer",
      ],
      kpis: [
        "Revenue per Marketing FTE",
        "Agentur-Spend vs. Inhouse-Spend Ratio",
        "Team Utilization Rate (%)",
        "Skill Coverage vs. Capability Map (%)",
        "Employee Engagement Score",
      ],
    },
  },
  {
    id: 4,
    label: "Prozesse & Workflows",
    question: "WIE?",
    subtitle: "Abläufe & Automatisierung",
    color: "#5D7186",
    Icon: Workflow,
    description:
      'Prozesse definieren, wie die Technologie genutzt und die Organisation eingesetzt wird. Sie \u00FCbersetzen Systemf\u00E4higkeiten in operative Abl\u00E4ufe. KPMG definiert Prozesse als das Herzst\u00FCck des TOM \u2013 \u201EEverything that happens is part of the process.\u201C Entscheidend: End-to-End-Perspektive \u00FCber Abteilungsgrenzen hinweg, nicht isolierte Teilprozesse.',
    details: [
      "End-to-End-Prozessketten: Vollständige Abbildung von Trigger bis Ergebnis, über Abteilungsgrenzen hinweg",
      "Prozesslandkarte: Hierarchische Darstellung aller Kern-, Management- und Supportprozesse",
      "SOP-Dokumentation: Standardisierte Arbeitsanweisungen für jeden Prozessschritt",
      "Automatisierungsgrad: Assessment pro Prozess – manuell vs. teil-automatisiert vs. voll-automatisiert (RPA, API, AI)",
      "Schnittstellen-Management: Definierte Übergabepunkte zwischen Abteilungen mit klaren Inputs/Outputs",
      "Continuous Improvement: Regelmäßige Prozessreviews, Process Mining, Lean/Six Sigma zur Optimierung",
      "Prozess-KPIs: Cycle Time, Error Rate, Throughput, Touchpoints pro Transaktion",
    ],
    finance: {
      intro:
        "Finance-Prozesse in PE-backed Companies werden auf Speed, Accuracy und Scalability optimiert – mit dem Month-End Close als Flaggschiff-Prozess.",
      items: [
        "Record-to-Report (R2R): Kernprozess von Buchung bis Reporterstellung – Ziel: Fast Close ≤5 BD mit Parallel-Processing statt sequentiellem Ablauf",
        "Month-End Close: Typische Optimierung von 12→7→5 Tagen durch Close Checkliste, Task Dependencies, Automatisierung von Abstimmungen und Journal Entries",
        "Order-to-Cash (O2C): End-to-End von Vertragsabschluss über Billing bis Cash Collection – in SaaS: Integration von Subscription Management, Usage Billing und Revenue Recognition",
        "Procure-to-Pay (P2P): Vom Bestellanforderung über Genehmigung, Wareneingang, Invoice Matching bis Zahlung – 3-Way-Match als Standard-Control",
        "Planning & Forecasting: Jährlicher Budgetprozess + Rolling Forecast (monatlich/quartalsweise) + 13-Week Cash Flow Forecast für Lender Reporting",
        "Intercompany-Prozesse: Bei Multi-Entity-Strukturen kritisch – Abstimmung, Elimination, Transfer Pricing, Intercompany Loans",
        "Investor Reporting Workflow: Datensammlung → Validierung → Analyse → Narrativ → Review → Versand – standardisiert mit festen Deadlines",
      ],
      kpis: [
        "Days to Close",
        "Journal Entry Error Rate (%)",
        "Straight-Through Processing Rate (%)",
        "Forecast Accuracy (±%)",
        "DSO (Days Sales Outstanding)",
      ],
    },
    marketing: {
      intro:
        "Marketing-Prozesse werden zunehmend als end-to-end Workflows designt – von der Kampagnenidee bis zur Revenue Attribution.",
      items: [
        "Lead-to-MQL-to-SQL-Prozess: Definierte Qualifizierungskriterien, Scoring-Modell, Übergabeprotokoll an Sales mit SLA (z.B. Lead Response Time ≤4h)",
        "Campaign Execution Workflow: Briefing → Content Creation → Review/Approval → Setup → Launch → Monitoring → Reporting → Optimization",
        "Content Production Pipeline: Redaktionsplanung → Erstellung → Review → Design → Publishing → Distribution → Performance Tracking",
        "Budget Allocation & Reforecast: Quarterly Reallokation basierend auf Channel-Performance, CAC-Effizienz und Pipeline-Beitrag",
        "Marketing-to-Sales Handoff: Definierter Übergabepunkt mit Datenanreicherung, automatischem CRM-Update und Follow-Up-Tracking",
        "Event Management Workflow: Planung (T-12w) → Promotion → Execution → Follow-Up → ROI-Analyse",
      ],
      kpis: [
        "Lead-to-MQL Conversion Rate (%)",
        "Campaign ROI",
        "Content Production Cycle Time",
        "Budget Reforecast Accuracy (%)",
        "Marketing-to-Sales Handoff Time",
      ],
    },
  },
  {
    id: 5,
    label: "Technologie, Daten & Infrastruktur",
    question: "WOMIT?",
    subtitle: "Werkzeuge & Fundament",
    color: "#3D4F5F",
    Icon: Database,
    description:
      "Das Fundament der Pyramide. Alles Weitere baut auf der Verfügbarkeit, Qualität und Integrität von Daten und Systemen auf. Ein ERP mit schlechter Datenqualität macht jeden darauf aufsetzenden Prozess unzuverlässig. Cloud-ERP-Lösungen setzen sich durch: 69% der Unternehmen haben bereits Cloud-ERP implementiert oder planen dies.",
    details: [
      "Core Systems: ERP, CRM, HCM – die transaktionalen Kernsysteme der Organisation",
      "Datenarchitektur: Data Warehouse / Data Lake, ETL/ELT-Pipelines, Datenmodell, Schnittstellen-Architektur",
      "Master Data Management: Einheitliche Stammdaten (Kunden, Produkte, Kontenplan, Kostenstellen) als Grundlage für konsistentes Reporting",
      "Integration Layer: API-Management, Middleware, iPaaS (z.B. Workato, MuleSoft, n8n) – Schnittstellen zwischen Systemen",
      "BI & Analytics: Reporting-Plattform (Power BI, Tableau, Looker), Self-Service Analytics, Dashboards",
      "Automatisierung: RPA (UiPath, Automation Anywhere), Low-Code/No-Code Plattformen, AI/ML für Anomalieerkennung und Forecasting",
      "Infrastruktur: Cloud (AWS, Azure, GCP) vs. On-Premise vs. Hybrid, Security, Backup, Disaster Recovery",
      "Datenqualität: Monitoring, Cleansing, Validierungsregeln – schlechte Daten kosten laut Gartner durchschnittlich $12,9M/Jahr",
    ],
    finance: {
      intro:
        "Der Finance Tech Stack in PE-backed SaaS Companies ist typischerweise ein Mix aus ERP, Konsolidierungstool, BI-Plattform und spezialisierten SaaS-Lösungen – oft historisch gewachsen und post-Akquisition fragmentiert.",
      items: [
        "ERP-System: SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365, DATEV (DACH-Mittelstand) – Kern für GL, AP, AR, Fixed Assets",
        "Konsolidierung: LucaNet, CCH Tagetik, OneStream, SAP Group Reporting – Multi-Entity-Konsolidierung mit IC-Elimination",
        "FP&A / CPM: Jedox, Adaptive Planning (Workday), Pigment, Abacum – für Budgetierung, Forecasting, Szenarioanalyse",
        "BI & Reporting: Power BI, Tableau, Looker – Self-Service Dashboards für Investor KPIs (ARR, NRR, Churn, LTV/CAC)",
        "Revenue Recognition: Zuora Revenue, RevPro – speziell für SaaS-Abrechnungsmodelle (Usage, Subscription, Multi-Element)",
        "Billing & Subscription Management: Zuora, Chargebee, Stripe Billing – Integration in GL für automatisierte Revenue Recognition",
        "Datenmodell: Einheitliche ARR-/MRR-Berechnung über alle Entities, Kohortenanalyse-fähige Datenstruktur, Customer-Level Profitability",
        "Automatisierung: VBA-Macros für Legacy-Reporting, RPA für repetitive Tasks, zunehmend AI für Anomalieerkennung in Transaktionsdaten",
      ],
      kpis: [
        "System Uptime (%)",
        "Data Quality Score (%)",
        "Integration Error Rate",
        "Report Generation Time",
        "Automation Rate (% automatisierte Prozessschritte)",
      ],
    },
    marketing: {
      intro:
        "Der MarTech Stack wächst kontinuierlich – durchschnittlich nutzen Unternehmen 91 Marketing-Tools. Entscheidend ist nicht die Anzahl, sondern die Integration und Datenflüsse zwischen den Systemen.",
      items: [
        "CRM: Salesforce, HubSpot, Microsoft Dynamics – Single Source of Truth für Kundendaten und Pipeline",
        "Marketing Automation: HubSpot, Marketo, Pardot – Lead Nurturing, Email Marketing, Scoring, Workflow Automation",
        "CDP (Customer Data Platform): Segment, mParticle – Unified Customer Profile über alle Touchpoints",
        "Attribution & Analytics: Google Analytics 4, Bizible (Marketo), HubSpot Attribution – Multi-Touch Attribution für Revenue Reporting",
        "Content Management: WordPress, Contentful – Publishing, SEO, Content Performance Tracking",
        "Paid Media: Google Ads, LinkedIn Campaign Manager, Meta Ads – mit Bidding-Optimierung und Conversion-Tracking",
        "Sales Enablement: Highspot, Seismic – Content Management für Sales, Usage Analytics, Buyer Engagement",
        "Integration: iPaaS (Workato, Zapier, n8n) für Datenflüsse zwischen MarTech-Systemen und CRM/ERP",
      ],
      kpis: [
        "MarTech Stack Utilization Rate (%)",
        "Data Sync Latency",
        "Tool Consolidation Ratio",
        "Integration Coverage (%)",
        "Cost per Tool vs. Usage",
      ],
    },
  },
];

/* ── Pyramid Layer (unchanged) ──────────────────── */

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
        height: 82,
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
          className={`font-display font-semibold tracking-wide leading-tight ${isTop ? 'whitespace-normal text-center' : 'truncate'}`}
          style={{
            fontSize: widthPercent < 45 ? 14 : 16,
            color: isTop ? "#0A1017" : "hsl(195 40% 93%)",
          }}
        >
          {layer.label}
        </div>
        {widthPercent > 30 && (
          <div
            className="font-mono-brand text-[10px] tracking-[0.1em] mt-0.5"
            style={{
              color: isTop ? "#0A101780" : "hsl(210 13% 45% / 0.6)",
            }}
          >
            {layer.question}
          </div>
        )}
        <div
          className="font-mono-brand text-xs tracking-[0.08em] mt-0.5 font-medium"
          style={{
            color: isTop ? "#0A1017CC" : `${layer.color}E6`,
          }}
        >
          {layer.subtitle}
        </div>
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

/* ── Department Tab Content ─────────────────────── */

const DepartmentTab = ({
  data,
  labelText,
  labelColor,
}: {
  data: DepartmentData;
  labelText: string;
  labelColor: string;
}) => (
  <div className="mt-0">
    <p className="text-base leading-relaxed text-muted-foreground mb-4">{data.intro}</p>
    <div
      className="font-mono-brand tracking-[0.15em] mb-2.5"
      style={{ fontSize: 9, color: labelColor }}
    >
      {labelText}
    </div>
    {data.items.map((item, i) => (
      <BulletItem key={i} text={item} color={labelColor} />
    ))}
    <div className="mt-4 pt-3.5" style={{ borderTop: "1px solid #1E2A36" }}>
      <div
        className="font-mono-brand tracking-[0.12em] mb-2.5"
        style={{ fontSize: 9, color: "#5D7186" }}
      >
        RELEVANTE KPIs
      </div>
      <div className="flex flex-wrap">
        {data.kpis.map((kpi, i) => (
          <KPIBadge key={i} label={kpi} />
        ))}
      </div>
    </div>
  </div>
);

/* ── Detail Modal ───────────────────────────────── */

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
      <DialogContent
        className="glass-card sm:max-w-[620px] p-0 gap-0 border-border/60 shadow-2xl overflow-hidden"
        style={{ maxHeight: "88vh" }}
      >
        {/* Sticky header with tabs */}
        <div
          className="sticky top-0 z-10 border-b"
          style={{ background: "#151F28", borderColor: "#1E2A36" }}
        >
          <DialogHeader className="p-6 pb-0">
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
                <DialogDescription
                  className="font-mono-brand text-xs tracking-[0.12em] mt-1"
                  style={{ color: layer.color }}
                >
                  {layer.question} — {layer.subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-muted/50 border border-border/40 mx-6 mt-4 mb-4">
              <TabsTrigger
                value="overview"
                className="font-mono-brand text-sm tracking-wide data-[state=active]:text-primary"
              >
                ÜBERSICHT
              </TabsTrigger>
              <TabsTrigger
                value="finance"
                className="font-mono-brand text-sm tracking-wide data-[state=active]:text-[#4CAF7A]"
              >
                FINANCE
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="font-mono-brand text-sm tracking-wide data-[state=active]:text-[#E5A84B]"
              >
                MARKETING
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scrollable content */}
        <Tabs defaultValue="overview" className="overflow-y-auto p-6 pt-4">
          <TabsContent value="overview" className="mt-0">
            <p className="text-base leading-relaxed text-muted-foreground mb-4">
              {layer.description}
            </p>
            <div
              className="font-mono-brand tracking-[0.12em] mb-2.5"
              style={{ fontSize: 9, color: "#5D7186" }}
            >
              KERNELEMENTE
            </div>
            {layer.details.map((d, i) => (
              <BulletItem key={i} text={d} color={layer.color} />
            ))}
          </TabsContent>

          <TabsContent value="finance" className="mt-0">
            <DepartmentTab
              data={layer.finance}
              labelText="FINANCE-DETAILS"
              labelColor="#4CAF7A"
            />
          </TabsContent>

          <TabsContent value="marketing" className="mt-0">
            <DepartmentTab
              data={layer.marketing}
              labelText="MARKETING-DETAILS"
              labelColor="#E5A84B"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

/* ── Main Component (unchanged) ─────────────────── */

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
