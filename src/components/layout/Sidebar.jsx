import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { motion as Motion } from "../../lib/motion.js";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const linkClass = ({ isActive }) => `link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar" style={{ width: collapsed ? 72 : 220 }}>
      <div className="brand">
        <button
          className="button"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand" : "Collapse"}
          aria-label="Toggle sidebar"
          style={{ width: 36 }}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
        <Motion.span
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -6 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: collapsed ? "none" : "inline-block" }}
        >
          askPilot
        </Motion.span>
      </div>

      <nav className="nav">
        <NavLink to="/" className={linkClass} style={{ textDecoration: "none" }}>
          <span style={{ width: 22, display: "inline-block" }}>📊</span>
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/settings" className={linkClass} style={{ textDecoration: "none" }}>
          <span style={{ width: 22, display: "inline-block" }}>⚙️</span>
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      <div className="footer">
        <Avatar />
        {!collapsed && (
          <Motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>You</div>
            <div className="small">Free plan</div>
          </Motion.div>
        )}
      </div>
    </aside>
  );
}
