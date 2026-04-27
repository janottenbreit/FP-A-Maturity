import { BarChart3, Search, TrendingUp, Handshake, Users, Database, type LucideIcon } from "lucide-react";

export interface CellData {
  short: string;
  desc: string;
  examples: string[];
  constraint: string;
  graduate: string;
}

export interface Dimension {
  id: string;
  Icon: LucideIcon;
}

export interface Level {
  id: number;
  color: string;
}

export const LEVELS: Level[] = [
  { id: 1, color: "#E85D5D" },
  { id: 2, color: "#E8C36A" },
  { id: 3, color: "#D4A843" },
  { id: 4, color: "#4ECDC4" },
  { id: 5, color: "#2EE89A" },
];

export const DIMENSIONS: Dimension[] = [
  { id: "reporting", Icon: BarChart3 },
  { id: "analysis", Icon: Search },
  { id: "forecasting", Icon: TrendingUp },
  { id: "consulting", Icon: Handshake },
  { id: "talent", Icon: Users },
  { id: "data_tools", Icon: Database },
];
