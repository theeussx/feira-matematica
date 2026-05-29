import { useState } from "react";
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
import CameraTransmit from "./pages/CameraTransmit";
import CameraViewer from "./pages/CameraViewer";

// Componente NotFound inline para evitar completamente erros de importação na Vercel
function NotFound() {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "80px 20px", 
      minHeight: "60vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "#333" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#666" }}>Página não encontrada</h2>
      <p style={{ color: "#888" }}>O caminho que você tentou acessar não existe ou foi movido.</p>
    </div>
  );
}

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
      <Route path="/camera-transmit" component={CameraTransmit} />
      <Route path="/camera-viewer" component={CameraViewer} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/participants" component={Participants} />
      <Route path="/future" component={Future} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;
    setLogoSrc(URL.createObjectURL(file));
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <Header logoSrc={logoSrc} onLogoUpload={handleLogoUpload} />
        <Router logoSrc={logoSrc} />
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
