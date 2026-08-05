import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { C } from '../styles/theme';
import Avatar from './Avatar';

export default function EditableAvatar({ name, size, photoUrl, onChange }) {
  const fileInputRef = useRef(null);
  function handlePick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  }
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <Avatar name={name} size={size} photoUrl={photoUrl} />
      <button onClick={() => fileInputRef.current?.click()} aria-label="Schimbă poza de profil" style={{
        position: 'absolute', bottom: -2, right: -2, width: Math.round(size * 0.34), height: Math.round(size * 0.34),
        borderRadius: 9999, background: C.purple, border: `2px solid ${C.bg}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
      }}>
        <Camera size={Math.round(size * 0.18)} color="#fff" />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePick} />
    </div>
  );
}
