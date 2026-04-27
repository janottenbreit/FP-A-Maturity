import ExportButton from "./ExportButton";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AppNav() {
  return (
    <nav className="flex items-center justify-end gap-2 pt-5 pb-2 px-4">
      <LanguageSwitcher />
      <ExportButton />
    </nav>
  );
}
