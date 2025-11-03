import { useSettings } from '../../hooks/useSettings';

export default function Avatar() {
  const { settings } = useSettings();
  const url = settings.avatarUrl || import.meta.env.VITE_USER_AVATAR_URL || '';
  return (
    <img
      className="avatar"
      alt={settings.displayName || 'profile'}
      src={url || 'https://i.pravatar.cc/120?img=5'}
    />
  );
}
