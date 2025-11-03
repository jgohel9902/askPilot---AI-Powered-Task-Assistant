import { useSettings } from "../hooks/useSettings.js";

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <div className="stack">

      <div className="card">
        <h3>Profile</h3>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <div className="field">
            <label>Display name</label>
            <input
              className="input"
              placeholder="Display name"
              value={settings.displayName}
              onChange={(e) => updateSettings({ displayName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Avatar URL</label>
            <input
              className="input"
              placeholder="https://..."
              value={settings.avatarUrl}
              onChange={(e) => updateSettings({ avatarUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Tasks</h3>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <div className="field">
            <label>Default priority</label>
            <select
              className="input"
              value={settings.defaultPriority}
              onChange={(e) => updateSettings({ defaultPriority: e.target.value })}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
          <div className="field">
            <label>Visibility</label>
            <div className="row" style={{ gap: 8 }}>
              <label className="row" style={{ gap: 8 }}>
                <input
                  type="checkbox"
                  checked={settings.showDone}
                  onChange={(e) => updateSettings({ showDone: e.target.checked })}
                />
                Show “Done” column
              </label>

              <label className="row" style={{ gap: 8 }}>
                <input
                  type="checkbox"
                  checked={settings.compact}
                  onChange={(e) => updateSettings({ compact: e.target.checked })}
                />
                Compact mode
              </label>

            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Danger Zone</h3>
        <button className="button danger" onClick={resetSettings}>
          Reset to defaults
        </button>
      </div>

    </div>
  );
}
