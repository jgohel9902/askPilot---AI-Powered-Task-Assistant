import { useTheme } from "../../hooks/useTheme";
import { motion as Motion } from "../../lib/motion.js";
import * as Tooltip from "@radix-ui/react-tooltip";
import Avatar from "./Avatar";
import CommandPalette from "../command/CommandPalette";

export default function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <div className="topbar">
      {/* Use a *narrow* container only for the bar, so the BAR looks tidy,
          while the PAGE CONTENT is full width. */}
      <div className="container narrow topbar-row">
        <Motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
          className="topbar-title"
        >
          askPilot — Dashboard
        </Motion.div>

        <div className="topbar-search">
          <input
            className="input"
            placeholder="Search tasks…  (press ⌘/Ctrl+K for commands)"
          />
        </div>

        <div className="topbar-actions">
          <CommandPalette />
          <Tooltip.Root delayDuration={200}>
            <Tooltip.Trigger asChild>
              <button className="button" onClick={toggle} aria-label="Toggle theme">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content sideOffset={6} className="card small">
                Toggle theme
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <button className="button" aria-label="Profile">
            <Avatar />
          </button>
        </div>
      </div>
    </div>
  );
}
