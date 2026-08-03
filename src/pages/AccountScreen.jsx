import { Bell, Briefcase, ChevronRight, CreditCard, Heart, HelpCircle, LogOut, MapPin, Settings, User } from 'lucide-react';
import { C, GRADIENT } from '../styles/theme';
import EditableAvatar from '../components/EditableAvatar';
import Rating from '../components/Rating';

export default function AccountScreen({ push, onSwitchMode, profilePhoto, onPhotoChange, profileInfo }) {
  const menu = [
    { label: 'Informațiile mele', icon: User, action: () => push('editProfile', {}) },
    { label: 'Adresele mele', icon: MapPin, action: () => push('addresses', {}) },
    { label: 'Metode de plată', icon: CreditCard, action: () => push('paymentMethods', {}) },
    { label: 'Favorite', icon: Heart, action: () => push('favorites', {}) },
    { label: 'Lucrările mele', icon: Briefcase, action: () => push('jobs') },
    { label: 'Notificări', icon: Bell, action: () => push('notifications', {}) },
    { label: 'Setări', icon: Settings, action: () => push('settings', {}) },
    { label: 'Ajutor și suport', icon: HelpCircle, action: () => push('help', {}) },
  ];
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-4 mb-5">
        <EditableAvatar name={profileInfo.name} size={64} photoUrl={profilePhoto} onChange={onPhotoChange} />
        <div>
          <h1 className="text-base font-bold" style={{ color: C.text }}>{profileInfo.name}</h1>
          <p className="text-xs mb-1" style={{ color: C.textMuted }}>{profileInfo.email}</p>
          <Rating value={4.9} count={12} />
        </div>
      </div>

      <button onClick={onSwitchMode} style={{ background: GRADIENT }} className="w-full rounded-2xl p-4 mb-5 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(255,255,255,0.16)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase size={18} color="#fff" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Mod Meseriaș</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Gestionează solicitări și programări</div>
          </div>
        </div>
        <ChevronRight size={18} color="#fff" />
      </button>

      <div className="flex flex-col">
        {menu.map(item => (
          <button key={item.label} onClick={item.action} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 py-3.5 text-left">
            <item.icon size={17} color={C.textMuted} />
            <span className="text-sm flex-1" style={{ color: C.text }}>{item.label}</span>
            <ChevronRight size={15} color={C.textFaint} />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 py-3.5 text-left mt-2">
          <LogOut size={17} color={C.red} />
          <span className="text-sm" style={{ color: C.red }}>Deconectare</span>
        </button>
      </div>
    </div>
  );
}
