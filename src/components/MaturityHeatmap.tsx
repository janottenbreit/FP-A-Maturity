import { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LEVELS, DIMENSIONS, type Level, type Dimension, type CellData } from "@/constants/maturityData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SelectedCell {
  dimension: Dimension;
  level: Level;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function useCellData(dimensionId: string, levelId: number): CellData {
  const { t } = useTranslation();
  return t(`cells.${dimensionId}.${levelId}`, { returnObjects: true }) as CellData;
}

const HeatmapCell = ({
  dimension,
  level,
  isSelected,
  isColumnHovered,
  onClick,
}: {
  dimension: Dimension;
  level: Level;
  isSelected: boolean;
  isColumnHovered: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const data = useCellData(dimension.id, level.id);
  const active = isSelected || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-all duration-200 p-2 flex items-start"
      style={{
        borderRadius: "6px",
        minHeight: "64px",
        background: active
          ? `rgba(${hexToRgb(level.color)}, 0.22)`
          : isColumnHovered
          ? `rgba(${hexToRgb(level.color)}, 0.1)`
          : `rgba(${hexToRgb(level.color)}, 0.06)`,
        border: isSelected
          ? `2px solid ${level.color}`
          : hovered
          ? `1px solid #D4A84360`
          : "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        padding: isSelected ? "7px" : "8px",
      }}
    >
      <p
        className="text-[11px] leading-relaxed"
        style={{
          color: active ? "#FFFFFF" : "#B0B5CC",
        }}
      >
        {data.short}
      </p>
    </div>
  );
};

const DetailPanel = ({
  cell,
  onClose,
}: {
  cell: SelectedCell;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const data = useCellData(cell.dimension.id, cell.level.id);
  const IconComponent = cell.dimension.Icon;
  const dimensionLabel = t(`dimensions.${cell.dimension.id}`);
  const levelShort = t(`levels.${cell.level.id}.short`);
  const levelName = t(`levels.${cell.level.id}.name`);

  return (
    <div
      className="animate-tom-slide-up rounded-[10px] p-4 md:p-5 max-w-[860px] mx-auto w-full relative"
      style={{
        backgroundColor: "#2A3158",
        border: `1px solid rgba(${hexToRgb(cell.level.color)}, 0.3)`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={14} />
      </button>

      {/* Panel Header */}
      <div className="flex items-center gap-3 mb-4">
        <IconComponent size={22} style={{ color: "#D4A843" }} />
        <span className="font-display text-lg font-semibold" style={{ color: "#D4A843" }}>
          {dimensionLabel}
        </span>
        <span
          className="font-mono-brand text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: `${cell.level.color}40`,
            color: cell.level.color,
          }}
        >
          {levelShort} – {levelName}
        </span>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible defaultValue="beschreibung">
        <AccordionItem value="beschreibung" className="border-b-0 mb-1">
          <AccordionTrigger
            className="py-2.5 px-3 rounded-md hover:no-underline text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "#FFFFFF", backgroundColor: "transparent", border: "1px solid #3D4470" }}
          >
            <span className="flex items-center gap-2">
              <span>📋</span> {t("ui.description")}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2">
            <p className="text-[13px] leading-relaxed" style={{ color: "#C8CCE0" }}>
              {data.desc}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="beispiele" className="border-b-0 mb-1">
          <AccordionTrigger
            className="py-2.5 px-3 rounded-md hover:no-underline text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "#D4A843", backgroundColor: "transparent", border: "1px solid #3D4470" }}
          >
            <span className="flex items-center gap-2">
              <span>💡</span> {t("ui.examples")} ({data.examples.length})
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2">
            <ul className="space-y-1.5">
              {data.examples.map((ex, i) => (
                <li key={i} className="text-[13px] leading-relaxed" style={{ color: "#C8CCE0" }}>
                  <span style={{ color: "#D4A843" }}>▸</span> {ex}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="constraint" className="border-b-0 mb-1">
          <AccordionTrigger
            className="py-2.5 px-3 rounded-md hover:no-underline text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "#E85D5D", backgroundColor: "transparent", border: "1px solid #3D4470" }}
          >
            <span className="flex items-center gap-2">
              <span>⚠</span> {t("ui.constraint")}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2">
            <p className="text-[13px] leading-relaxed" style={{ color: "#C8CCE0" }}>
              {data.constraint}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="graduate" className="border-b-0">
          <AccordionTrigger
            className="py-2.5 px-3 rounded-md hover:no-underline text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "#4ECDC4", backgroundColor: "transparent", border: "1px solid #3D4470" }}
          >
            <span className="flex items-center gap-2">
              <span>↗</span> {t("ui.graduate")}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2">
            <p className="text-[13px] leading-relaxed" style={{ color: "#C8CCE0" }}>
              {data.graduate}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default function MaturityHeatmap() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SelectedCell | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const handleCellClick = (dimension: Dimension, level: Level) => {
    if (selected?.dimension.id === dimension.id && selected?.level.id === level.id) {
      setSelected(null);
    } else {
      setSelected({ dimension, level });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 md:px-7 py-10 md:py-16">
      {/* Header */}
      <header className="text-center mb-10 max-w-xl">
        <h1 className="font-display text-2xl md:text-[34px] font-semibold leading-tight tracking-tight mb-3">
          <span style={{ color: "#D4A843" }}>{t("header.titlePart1")}</span>{" "}
          <span className="text-foreground">{t("header.titlePart2")}</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
          {t("header.subtitle")}
        </p>
      </header>

      {/* Legend Bar */}
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className="flex items-center gap-1.5 font-mono-brand text-[11px] tracking-wide transition-opacity duration-200"
            style={{
              color: level.color,
              opacity: hoveredCol !== null && hoveredCol !== level.id ? 0.35 : 1,
            }}
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: level.color }}
            />
            {t(`levels.${level.id}.short`)} – {t(`levels.${level.id}.name`)}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="w-full max-w-[960px] overflow-x-auto pb-2">
        <div
          className="min-w-[820px]"
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(5, 1fr)",
            gap: "4px",
          }}
        >
          {/* Column Headers */}
          <div /> {/* empty top-left */}
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="text-center pb-2 cursor-default"
              style={{ borderBottom: `2px solid ${level.color}` }}
              onMouseEnter={() => setHoveredCol(level.id)}
              onMouseLeave={() => setHoveredCol(null)}
            >
              <div className="font-display text-sm font-semibold" style={{ color: level.color }}>
                {t(`levels.${level.id}.short`)}
              </div>
              <div className="text-[10px] text-muted-foreground">{t(`levels.${level.id}.name`)}</div>
            </div>
          ))}

          {/* Rows */}
          {DIMENSIONS.map((dim) => {
            const IconComponent = dim.Icon;
            return (
              <div key={dim.id} className="contents">
                {/* Row label */}
                <div className="flex items-center gap-2 pr-2 min-h-[64px]">
                  <IconComponent size={16} style={{ color: "#D4A843" }} className="flex-shrink-0" />
                  <span
                    className="font-mono-brand text-[11px] font-bold tracking-wide uppercase"
                    style={{ color: "#D4A843" }}
                  >
                    {t(`dimensions.${dim.id}`)}
                  </span>
                </div>

                {/* Cells */}
                {LEVELS.map((level) => (
                  <HeatmapCell
                    key={`${dim.id}-${level.id}`}
                    dimension={dim}
                    level={level}
                    isSelected={selected?.dimension.id === dim.id && selected?.level.id === level.id}
                    isColumnHovered={hoveredCol === level.id}
                    onClick={() => handleCellClick(dim, level)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel or Hint */}
      <div className="w-full max-w-[960px] mt-6">
        {selected ? (
          <DetailPanel cell={selected} onClose={() => setSelected(null)} />
        ) : (
          <p className="text-center text-[11px] italic" style={{ color: "#3D4470" }}>
            {t("ui.clickHint")}
          </p>
        )}
      </div>
    </div>
  );
}
