import { NavLink as RNavLink } from 'react-router-dom';

export function NavLink({ to, label, icon, collapsed }) {
  return (
    <RNavLink
      to={to}
      className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <span style={{ width: 22, display: 'inline-block' }}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </RNavLink>
  );
}
