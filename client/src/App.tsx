import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Sensors from "./pages/Sensors";
import Future from "./pages/Future";
import Math from "./pages/Math";
import Demo from "./pages/Demo";
import Quiz from "./pages/Quiz";
import Participants from "./pages/Participants";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface RouterProps {
  logoSrc: string | null;
}

function Router({ logoSrc }: RouterProps) {
  return (
    <Switch>
      <Route path="/">{() => <Home logoSrc={logoSrc} />}</Route>
      <Route path="/sensors" component={Sensors} />
      <Route path="/math" component={Math} />
      <Route path="/demo" component={Demo} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/participants" component={Participants} />
      <Route path="/future" component={Future} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;
    setLogoSrc(URL.createObjectURL(file));
  };

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Header logoSrc={logoSrc} onLogoUpload={handleLogoUpload} />
          <Router logoSrc={logoSrc} />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

