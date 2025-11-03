import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.jsx";
import Topbar from "./components/layout/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";

import { AnimatePresence } from "./lib/motion.js";
import { PageTransition } from "./components/motion/MotionWrapper.jsx";
import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";

function AppShell() {
  const location = useLocation();

  return (
    <div
      className="app-shell"
      style={{ display: "grid", gridTemplateColumns: "auto 1fr", minHeight: "100vh" }}
    >
      <Sidebar />
      <div className="main" style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <div
          className="container"
          style={{
            width: "100%",
            maxWidth: "none",
            margin: 0,
            padding: "24px"
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  );
}
