// src/components/common/EmptyState.jsx
export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="emptystate">
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#2463eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="72" height="56" rx="12" fill="url(#g1)" />
        <rect x="18" y="26" width="52" height="8" rx="4" fill="currentColor" opacity="0.15" />
        <rect x="18" y="40" width="38" height="8" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="18" y="54" width="28" height="8" rx="4" fill="currentColor" opacity="0.10" />
      </svg>
      <div className="emptystate-text">
        <div className="emptystate-title">{title}</div>
        <div className="emptystate-sub">{subtitle}</div>
      </div>
      {action ? <div className="emptystate-action">{action}</div> : null}
    </div>
  );
}
