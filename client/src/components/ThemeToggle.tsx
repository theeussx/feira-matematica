import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full border-border hover:bg-muted transition-colors"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-foreground" />
      )}
    </Button>
  );
}

