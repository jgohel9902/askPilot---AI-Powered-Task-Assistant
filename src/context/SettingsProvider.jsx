import { useEffect, useMemo, useState } from "react";
import { SettingsContext } from "./SettingsContext";


const DEFAULTS = {
  displayName: "You",
  avatarUrl: "",
  defaultPriority: "medium",
  showDone: true,
  compact: false,
};

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("askpilot_settings");
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem("askpilot_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.compact) {
      document.body.setAttribute("data-compact", "1");
    } else {
      document.body.removeAttribute("data-compact");
    }
  }, [settings.compact]);

  const updateSettings = (patch) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const resetSettings = () => setSettings(DEFAULTS);

  const value = useMemo(
    () => ({ settings, updateSettings, resetSettings }),
    [settings]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}
