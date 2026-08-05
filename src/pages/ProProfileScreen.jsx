import { useRef, useState } from 'react';
import { Camera, ChevronRight, ClipboardList, CreditCard, HelpCircle, Home, LogOut, Pencil, Plus, Settings, TrendingUp, User, Users, X } from 'lucide-react';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import EditableAvatar from '../components/EditableAvatar';
import MyPortfolioGrid from '../components/MyPortfolioGrid';
import Rating from '../components/Rating';

export default function ProProfileScreen({ push, plan, profilePhoto, onPhotoChange, portfolio, onAddPortfolioPhoto, onRemovePortfolioPhoto, onSwitchMode, profileInfo, onUpdateBio, onUpdateCoverPhoto, onUpdateCompanyName, onAddService, onRemoveService, onLogout }) {
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profileInfo.bio || '');
  const [newService, setNewService] = useState('');
  const [editingCompanyName, setEditingCompanyName] = useState(false);
  const [companyNameInput, setCompanyNameInput] = useState(profileInfo.companyName || '');
  const coverInputRef = useRef(null);
  const menu = [
    { label: 'Informațiile mele', icon: User, action: () => push('editProfile', {}) },
    { label: 'Abonamentul meu', icon: CreditCard, action: () => push('proSubscriptions', {}) },
    ...(plan === 'Business' ? [{ label: 'Angajații mei', icon: Users, action: () => push('proEmployees', {}) }] : []),
    { label: 'Statistici', icon: TrendingUp, action: () => push('proStats', {}) },
    { label: 'Liste de materiale', icon: ClipboardList, action: () => push('materialsHub', {}) },
    { label: 'Setări', icon: Settings, action: () => push('settings', {}) },
    { label: 'Ajutor și suport', icon: HelpCircle, action: () => push('help', {}) },
  ];

  function saveBio() {
    onUpdateBio(bioText.trim());
    setEditingBio(false);
  }

  function submitService() {
    if (!newService.trim()) return;
    onAddService(newService.trim());
    setNewService('');
  }

  function handleCoverPick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdateCoverPhoto(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function saveCompanyName() {
    onUpdateCompanyName(companyNameInput.trim());
    setEditingCompanyName(false);
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div style={{ position: 'relative', height: 140, borderRadius: 20, overflow: 'hidden', marginBottom: 12, background: profileInfo.coverPhoto ? 'transparent' : GRADIENT }}>
        {profileInfo.coverPhoto ? (
          <img src={profileInfo.coverPhoto} alt="Copertă" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-6 text-center">
            <span className="text-sm font-semibold text-white">
              {profileInfo.companyName || 'Adaugă o poză de copertă sau numele firmei'}
            </span>
          </div>
        )}
        <button onClick={() => coverInputRef.current?.click()} aria-label="Schimbă poza de copertă" style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.55)' }} className="w-8 h-8 rounded-full flex items-center justify-center">
          <Camera size={15} color="#fff" />
        </button>
        <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverPick} />
      </div>

      <div className="mb-4">
        {editingCompanyName ? (
          <div className="flex gap-2">
            <input value={companyNameInput} onChange={e => setCompanyNameInput(e.target.value)} placeholder="Numele firmei (opțional)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
            <button onClick={saveCompanyName} style={{ background: GRADIENT }} className="rounded-xl px-4 text-xs font-semibold text-white flex-shrink-0">Salvează</button>
          </div>
        ) : (
          <button onClick={() => { setCompanyNameInput(profileInfo.companyName || ''); setEditingCompanyName(true); }} style={{ background: 'none', border: 'none', padding: 0 }} className="text-xs font-medium" >
            <span style={{ color: C.purple }}>{profileInfo.companyName ? 'Editează numele firmei' : '+ Adaugă numele firmei'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <EditableAvatar name={profileInfo.name} size={64} photoUrl={profilePhoto} onChange={onPhotoChange} />
        <div>
          <h1 className="text-base font-bold" style={{ color: C.text }}>{profileInfo.name}</h1>
          <p className="text-xs mb-1" style={{ color: C.textMuted }}>Electrician · Verificat</p>
          <Rating value={4.9} count={12} />
        </div>
      </div>
      <div style={{ background: 'rgba(249,115,22,0.1)', border: `1px solid ${C.purple}` }} className="rounded-xl px-3.5 py-2.5 mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: C.text }}>Plan {plan}</span>
        <button onClick={() => push('proSubscriptions', {})} className="text-xs font-medium" style={{ color: C.purple }}>Gestionează</button>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold" style={{ color: C.text }}>Biografie</h2>
          {!editingBio && (
            <button onClick={() => { setBioText(profileInfo.bio || ''); setEditingBio(true); }} aria-label="Editează biografia" style={{ background: 'none', border: 'none', padding: 0 }}>
              <Pencil size={14} color={C.purple} />
            </button>
          )}
        </div>
        {editingBio ? (
          <div>
            <textarea value={bioText} onChange={e => setBioText(e.target.value)} rows={4} placeholder="Scrie câteva rânduri despre tine, experiența și serviciile tale..." style={{ ...inputStyle, resize: 'none' }} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditingBio(false)} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex-1 rounded-xl py-2 text-xs font-semibold">
                <span style={{ color: C.textMuted }}>Anulează</span>
              </button>
              <button onClick={saveBio} style={{ background: GRADIENT }} className="flex-1 rounded-xl py-2 text-xs font-semibold text-white">
                Salvează
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed" style={{ color: profileInfo.bio ? C.textMuted : C.textFaint }}>
            {profileInfo.bio || 'Adaugă o scurtă descriere despre tine și serviciile tale, vizibilă clienților.'}
          </p>
        )}
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: C.text }}>Servicii</h2>
        {(profileInfo.services && profileInfo.services.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-2">
            {profileInfo.services.map((s, i) => (
              <span key={i} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="flex items-center gap-1.5 text-xs pl-3 pr-2 py-1.5 rounded-full">
                <span style={{ color: C.text }}>{s}</span>
                <button onClick={() => onRemoveService(i)} aria-label={`Șterge serviciul ${s}`} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center justify-center">
                  <X size={11} color={C.textMuted} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={newService}
            onChange={e => setNewService(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitService(); }}
            placeholder="ex. Instalații electrice"
            style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }}
          />
          <button onClick={submitService} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Plus size={16} color={C.text} />
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold mb-1" style={{ color: C.text }}>Portofoliul meu</h2>
        <p className="text-xs mb-2" style={{ color: C.textMuted }}>Adaugă poze cu lucrările tale finalizate, vizibile clienților.</p>
        <MyPortfolioGrid photos={portfolio} onAdd={onAddPortfolioPhoto} onRemove={onRemovePortfolioPhoto} />
      </div>

      <div className="flex flex-col mb-4">
        {menu.map(item => (
          <button key={item.label} onClick={item.action} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 py-3.5 text-left">
            <item.icon size={17} color={C.textMuted} />
            <span className="text-sm flex-1" style={{ color: C.text }}>{item.label}</span>
            <ChevronRight size={15} color={C.textFaint} />
          </button>
        ))}
      </div>
      <button onClick={onSwitchMode} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold mb-2">
        <Home size={15} color={C.text} /> <span style={{ color: C.text }}>Comută la Mod Client</span>
      </button>
      <button onClick={onLogout} className="w-full flex items-center gap-3 py-3.5 text-left">
        <LogOut size={17} color={C.red} />
        <span className="text-sm" style={{ color: C.red }}>Deconectare</span>
      </button>
    </div>
  );
}
