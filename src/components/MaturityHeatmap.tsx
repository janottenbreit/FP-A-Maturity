import { useState } from "react";
import { X } from "lucide-react";
import { LEVELS, DIMENSIONS, CELL_DATA, type Level, type Dimension } from "@/constants/maturityData";

interface SelectedCell {
  dimension: Dimension;
  level: Level;
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
  const data = CELL_DATA[dimension.id][level.id];
  const active = isSelected || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-all duration-200 rounded-lg p-3 min-h-[80px] flex items-start"
      style={{
        background: active
          ? `rgba(${hexToRgb(level.color)}, 0.2)`
          : isColumnHovered
          ? `rgba(${hexToRgb(level.color)}, 0.1)`
          : `rgba(${hexToRgb(level.color)}, 0.06)`,
        border: isSelected
          ? `2px solid ${level.color}`
          : hovered
          ? `1px solid ${level.color}60`
          : "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: active
          ? `0 4px 20px ${level.color}20`
          : "0 1px 4px rgba(0,0,0,0.2)",
        padding: isSelected ? "11px" : "12px",
      }}
    >
      <p
        className="text-xs leading-relaxed"
        style={{
          color: active ? "hsl(195 40% 93%)" : "hsl(210 15% 70%)",
        }}
      >
        {data.desc}
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
  const data = CELL_DATA[cell.dimension.id][cell.level.id];
  const IconComponent = cell.dimension.Icon;

  return (
    <div
      className="animate-tom-slide-up glass-card rounded-xl p-5 md:p-6 max-w-[800px] mx-auto w-full relative"
      style={{
        border: `1px solid ${cell.level.color}40`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={14} />
      </button>

      <div className="flex items-center gap-3 mb-5">
        <IconComponent size={20} style={{ color: "#D4A843" }} />
        <span className="font-display text-lg font-semibold" style={{ color: "#D4A843" }}>
          {cell.dimension.label}
        </span>
        <span
          className="font-mono-brand text-[11px] tracking-wide px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: `${cell.level.color}30`,
            color: cell.level.color,
          }}
        >
          {cell.level.short} – {cell.level.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <div className="font-mono-brand text-[11px] tracking-[0.12em] text-muted-foreground mb-2">
            BESCHREIBUNG
          </div>
          <p className="text-sm leading-relaxed text-foreground">{data.desc}</p>
        </div>
        <div>
          <div className="font-mono-brand text-[11px] tracking-[0.12em] mb-2" style={{ color: "#E85D5D" }}>
            ⚠ CONSTRAINT
          </div>
          <p className="text-sm leading-relaxed text-foreground">{data.constraint}</p>
        </div>
        <div>
          <div className="font-mono-brand text-[11px] tracking-[0.12em] mb-2" style={{ color: "#4ECDC4" }}>
            ↗ GRADUATE
          </div>
          <p className="text-sm leading-relaxed text-foreground">{data.graduate}</p>
        </div>
      </div>
    </div>
  );
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function MaturityHeatmap() {
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
    <div className="min-h-screen bg-background flex flex-col items-center px-5 md:px-8 py-10 md:py-16">
      {/* Header */}
      <header className="text-center mb-10 max-w-xl">
        <h1 className="font-display text-2xl md:text-[34px] font-semibold leading-tight tracking-tight mb-3">
          <span style={{ color: "#D4A843" }}>Reifegrad</span>{" "}
          <span className="text-foreground">in FP&A</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
          Reifegrade der FP&A-Funktion in Unternehmen
        </p>
      </header>

      {/* Legend Bar */}
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className="font-mono-brand text-[11px] tracking-wide px-3 py-1.5 rounded-full transition-opacity duration-200"
            style={{
              backgroundColor: `${level.color}20`,
              color: level.color,
              border: `1px solid ${level.color}30`,
              opacity: hoveredCol !== null && hoveredCol !== level.id ? 0.35 : 1,
            }}
          >
            {level.short} – {level.name}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="w-full max-w-[960px] overflow-x-auto pb-2">
        <div
          className="min-w-[700px]"
          style={{
            display: "grid",
            gridTemplateColumns: "140px repeat(5, 1fr)",
            gap: "6px",
          }}
        >
          {/* Column Headers */}
          <div /> {/* empty top-left */}
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="font-display text-sm font-semibold tracking-wide text-center pb-2 cursor-default"
              style={{ color: level.color }}
              onMouseEnter={() => setHoveredCol(level.id)}
              onMouseLeave={() => setHoveredCol(null)}
            >
              {level.name}
            </div>
          ))}

          {/* Rows */}
          {DIMENSIONS.map((dim) => {
            const IconComponent = dim.Icon;
            return (
              <div key={dim.id} className="contents">
                {/* Row label */}
                <div className="flex items-center gap-2 pr-3 min-h-[80px]">
                  <IconComponent size={16} style={{ color: "#D4A843" }} className="flex-shrink-0" />
                  <span
                    className="font-mono-brand text-xs font-bold tracking-wide uppercase"
                    style={{ color: "#D4A843" }}
                  >
                    {dim.label}
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
          <p className="text-center text-sm italic text-muted-foreground">
            Klicke auf eine Zelle für Details — Constraint & Graduation Criteria
          </p>
        )}
      </div>
    </div>
  );
}
