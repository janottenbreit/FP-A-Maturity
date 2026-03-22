import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "TOM Pyramide" },
  { to: "/maturity", label: "FP&A Reifegrad" },
];

export default function AppNav() {
  const location = useLocation();

  return (
    <nav className="flex justify-center gap-1 pt-5 pb-2 px-4">
      <div className="glass-card rounded-full flex gap-1 p-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`font-mono-brand text-xs tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                active
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
