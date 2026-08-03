import { C } from '../styles/theme';
import BackButton from '../components/BackButton';
import ToggleSwitch from '../components/ToggleSwitch';

export default function SettingsScreen({ settings, onChange, goBack }) {
  const rows = [
    { key: 'pushNotifications', label: 'Notificări push', desc: 'Primește alerte pentru mesaje și programări' },
    { key: 'emailUpdates', label: 'Actualizări pe email', desc: 'Rezumate și oferte pe email' },
    { key: 'darkMode', label: 'Mod întunecat', desc: 'Interfață cu fundal închis' },
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Setări</h1>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map(r => (
          <div key={r.key} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold" style={{ color: C.text }}>{r.label}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{r.desc}</div>
            </div>
            <ToggleSwitch checked={settings[r.key]} onChange={(v) => onChange(r.key, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}
