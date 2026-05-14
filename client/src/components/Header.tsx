import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [, navigate] = useLocation();

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Sensores", path: "/sensors" },
    { label: "Matemática", path: "/math" },
    { label: "Demonstração", path: "/demo" },
    { label: "Quiz", path: "/quiz" },
    { label: "Participantes", path: "/participants" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-foreground hidden sm:inline">Feira de matematica AR</span>
        </button>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Menu
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted first:rounded-t-lg last:rounded-b-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
