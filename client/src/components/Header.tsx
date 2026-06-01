import { Button } from "../components/ui/button";
import ThemeToggle from "../components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useState, type ChangeEvent } from "react";

interface HeaderProps {
  logoSrc: string | null;
  onLogoUpload: (file: File | null) => void;
}

export default function Header({ logoSrc, onLogoUpload }: HeaderProps) {
  const [, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Sensores", path: "/sensors" },
    { label: "Futuro", path: "/future" },
    { label: "Matemática", path: "/math" },
    { label: "Demonstração", path: "/demo" },
    { label: "Quiz", path: "/quiz" },
    { label: "Participantes", path: "/participants" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onLogoUpload(file);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <img src={logoSrc ?? "/image/logo.png"} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </label>
          <button onClick={() => handleNavigate("/")} className="hover:opacity-80 transition-opacity">
            <span className="font-bold text-foreground hidden sm:inline">AR feira de matemática</span>
          </button>
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.path} onClick={() => handleNavigate(item.path)} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-muted rounded-md transition-colors">
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
          <ThemeToggle />
        </div>
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
