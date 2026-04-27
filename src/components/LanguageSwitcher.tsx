import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "de").slice(0, 2) as SupportedLanguage;

  const handleSelect = (lng: SupportedLanguage) => {
    void i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono-brand uppercase tracking-wide rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        aria-label={t("languageSwitcher.label")}
      >
        <Globe size={13} />
        <span>{current.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onSelect={() => handleSelect(lng)}
            className="text-[12px] cursor-pointer flex items-center justify-between gap-3"
          >
            <span>{t(`languageSwitcher.${lng}`)}</span>
            {current === lng && <Check size={13} className="opacity-80" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
