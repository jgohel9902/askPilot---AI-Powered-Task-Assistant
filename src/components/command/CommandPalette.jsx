import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useTheme } from "../../hooks/useTheme";
import { useTasks } from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useHotkeys } from "react-hotkeys-hook";
import { Command } from "cmdk";

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { toggle } = useTheme();
  const { addTask } = useTasks();
  const nav = useNavigate();

  useHotkeys("mod+k", (e) => { e.preventDefault(); setOpen((o) => !o); });

  return (
    <>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <button className="button" onClick={() => setOpen(true)} aria-label="Open command palette">
            ⌘K
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={6} className="card small">Open command palette</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>

      {open && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.25)",
          display: "grid", placeItems: "start center", paddingTop: 80, zIndex: 50
        }}
        onClick={() => setOpen(false)}>
          <Command
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            onClick={(e) => e.stopPropagation()}
            style={{ width: 560 }}
          >
            <div className="card" style={{ padding: 0 }}>
              <Command.Input autoFocus placeholder="Type a command…" className="input" style={{ border: "none", borderBottom: "1px solid var(--border)", borderRadius: "12px 12px 0 0" }} />
              <Command.List style={{ maxHeight: 360, overflow: "auto", padding: 8 }}>
                <Command.Empty className="small">No results</Command.Empty>
                <Command.Group heading="General">
                  <Command.Item onSelect={() => { toggle(); toast.success("Theme toggled"); setOpen(false); }}>Toggle theme</Command.Item>
                  <Command.Item onSelect={() => { nav("/settings"); setOpen(false); }}>Open Settings</Command.Item>
                </Command.Group>
                <Command.Group heading="Tasks">
                  <Command.Item onSelect={async () => { await addTask({ title: "New task", priority: "medium", status: "todo" }); toast.success("Task created"); setOpen(false); }}>Add quick task</Command.Item>
                </Command.Group>
              </Command.List>
            </div>
          </Command>
        </div>
      )}
    </>
  );
}
